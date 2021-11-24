const HttpError = require("../../errorTypes/HttpError");

const { hashPassword, checkPassword } = require("../../helpers/passwordHash");
const { db } = require("../../db");
const { createJwtToken } = require("../../helpers/jwtHeplers");
const mediaService = require("./mediaService");
const { upload } = require("../middlewares/fileUpload");

const userService = {
  async createUser(data) {
    const { special_status, email, password, address, phone_number } = data;
    const hashedPassword = await hashPassword(password);
    delete data["confirm_password"];

    const emailUser = await userService.getUserByEmail(email);
    if (emailUser) {
      throw new Error("A user with this email already exists");
    }
    const emailExist = await db()
      .select("*")
      .from("special_users")
      .where({ email })
      .first();
    if (emailExist) {
      throw new HttpError("This user already exists", 422);
    }

    let user;
    if (special_status == "true") {
      if (!data.name) {
        throw new HttpError("Name should not be empty", 422);
      }
      if (!data.function) {
        throw new HttpError("Function should not be empty", 422);
      }

      user = (
        await db()
          .insert({
            name: data.name,
            function: data.function,
            password: hashedPassword,
            email,
            address,
          })
          .returning("*")
          .into("special_users")
      )[0];
    } else {
      if (!data.first_name) {
        throw new HttpError("First name should not be empty", 422);
      }
      if (!data.last_name) {
        throw new HttpError("Last name should not be empty", 422);
      }

      user = (
        await db()
          .insert({
            first_name: data.first_name,
            last_name: data.last_name,
            email,
            password: hashedPassword,
            address,
            phone_number,
          })
          .returning("*")
          .into("users")
      )[0];
    }

    let token = null;

    if (user.function) {
      token = await createJwtToken({
        id: user.id,
        function: user.function,
      });
    } else {
      token = await createJwtToken({ id: user.id });
    }

    return { ...user, token };
  },

  async getUserByEmail(email) {
    return await db().select().from("users").where({ email }).first();
  },

  async forgotPassword(email) {
    const user = await userService.getUserByEmail(email);
    // const specialUser = await db()
    //   .select("*")
    //   .from("special_users")
    //   .where({ email })
    //   .first();

    if (!user) {
      throw new Error("This email is not a valid user");
    }
    let chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 10;
    let password = "";

    for (let i = 0; i <= passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    let hashedPassword = await hashPassword(password);

    if (user) {
      await db()
        .update({ password: hashedPassword })
        .from("users")
        .where({ id: user.id });

      return { ...user, password };
    }

    // await db()
    //   .update({ password: hashedPassword })
    //   .from("special_users")
    //   .where({ id: specialUser.id });

    // return { ...specialUser, password };
  },

  async getUserById(userId) {
    const user = await db()
      .select("*")
      .from("users")
      .where({ id: userId })
      .first();

    return user;
  },

  async upload(file, user_id) {
    const user = await userService.getUserById(user_id);
    if (file) {
      const fileExists = await mediaService.insertMedia(file, user.id, "user");
      if (fileExists) {
        await mediaService.updateMedia(file, user.id, "user");
      }
    }
    return await userService.getUserDetails(user.id);
  },

  async updateUser(data, file, user_id) {
    const { first_name, last_name, name, address, phone_number } = data;
    const user = await userService.getUserById(user_id);
    const specialUser = await userService.getSpecialUserById(user_id);
    if (!user && !specialUser) {
      throw new HttpError("This user does not exist", 422);
    }
    let datasToUpdate = {};
    if (user) {
      if (first_name) {
        datasToUpdate.first_name = first_name;
      }
      if (last_name) datasToUpdate.last_name = last_name;
      if (address) datasToUpdate.address = address;
      if (phone_number) datasToUpdate.phone_number = phone_number;
      await db()
        .update({
          ...datasToUpdate,
          updated_at: new Date(),
        })
        .from("users")
        .where({ id: user.id })
        .returning("*");
      if (file) {
        const fileExists = await mediaService.insertMedia(
          file,
          user.id,
          "user"
        );
        if (fileExists) {
          await mediaService.updateMedia(file, user.id, "user");
        }
      }
      return await userService.getUserDetails(user.id);
    }
    if (name) {
      datasToUpdate.name = name;
    }
    if (data.function) {
      datasToUpdate.function = data.function;
    }
    await db()
      .update({
        ...datasToUpdate,
        updated_at: new Date(),
      })
      .from("special_users")
      .where({ id: specialUser.id })
      .returning("*");
    if (file) {
      await mediaService.insertMedia(file, specialUser.id, "special_user");
    }
    return await userService.getUserDetails(specialUser.id);
  },

  async login(data) {
    const { email, password } = data;
    const user = await db()
      .select("users.*", "media.title", "media.id as media_id")
      .from("users")
      .leftJoin("media", "media.model_id", "users.id")
      .where({ email: email.toLowerCase() })
      .returning("*")
      .first();

    const specialUser = await db()
      .select("special_users.*")
      .from("special_users")
      .where({ email })
      .returning()
      .first();

    if (!user && !specialUser) {
      throw new HttpError("Invalid credentials!", 422);
    }
    let tokenObj;
    if (user) {
      const passwordIsCorrect = await checkPassword(password, user.password);
      if (!passwordIsCorrect) {
        throw new HttpError("Invalid credentials!", 422);
      }
      tokenObj = { id: user.id };
    } else if (specialUser) {
      const passwordIsCorrect = await checkPassword(
        password,
        specialUser.password
      );
      if (!passwordIsCorrect) {
        throw new HttpError("Invalid credentials!", 422);
      }
      tokenObj = { id: specialUser.id };
    }

    const token = await createJwtToken(tokenObj);

    return { user: user ? user : specialUser, token };
  },

  async changePassword(user_id, old_password, new_password) {
    const userExists = await userService.getUserById(user_id);
    const specialUser = await userService.getSpecialUserById(user_id);

    if (!userExists) {
      throw new HttpError("This user does not exist", 422);
    }

    if (userExists) {
      const passwordIsCorrect = await checkPassword(
        old_password,
        userExists.password
      );
      if (!passwordIsCorrect) {
        throw new Error("Old password is not correct!");
      }
    }
    // if (specialUser) {
    //   const passwordIsCorrect = await checkPassword(
    //     old_password,
    //     userExists.password
    //   );
    //   if (!passwordIsCorrect) {
    //     throw new Error("Old password is not correct!");
    //   }
    // }

    const hashedPassword = await hashPassword(new_password);

    if (userExists) {
      return await db()
        .update({ password: hashedPassword })
        .from("users")
        .where({ id: user_id });
    }
    // return await db()
    //   .update({ password: hashedPassword })
    //   .from("special_users")
    //   .where({ id: specialUser.id });
  },

  async getSpecialUserById(user_id) {
    return await db()
      .select("*")
      .from("special_users")
      .where({ id: user_id })
      .first();
  },

  async deleteUser(user_id) {
    const user = await userService.getUserById(user_id);
    const specialUser = await userService.getSpecialUserById(user_id);
    if (!user && !specialUser) {
      throw new Error("This user does not exist");
    }
    if (user) {
      await db().delete().from("users").where({ id: user_id });
      return user;
    }
    await db().delete().from("special_users").where({ id: user_id });
    return specialUser;
  },

  async getAllUsersFiltered(data) {
    data = Object.assign(
      {
        rows: 10,
        page: 1,
      },
      data
    );
    let allUsers = db()
      .select("users.*", "media.title")
      .from("users")
      .leftJoin("media", "users.id", "media.model_id");

    if (data.search) {
      allUsers.where(function () {
        this.where(
          "users.first_name",
          "ilike",
          `%${data.search || ""}%`
        ).orWhere("users.last_name", "ilike", `%${data.search || ""}%`);
      });
    }

    let allSpecialUsers = db()
      .select("special_users.*", "media.title")
      .from("special_users")
      .leftJoin("media", "special_users.id", "media.model_id");
    if (data.search) {
      allSpecialUsers.where(
        "special_users.name",
        "ilike",
        `%${data.search || ""}%`
      );
    }

    allUsers = await allUsers;
    allSpecialUsers = await allSpecialUsers;

    let allUsersTogether = allUsers.concat(allSpecialUsers);
    return allUsersTogether;
  },

  async getUserDetails(user_id) {
    const user = await db()
      .select("users.*", "media.title", "media.id as media_id")
      .from("users")
      .leftJoin("media", "media.model_id", "users.id")
      .where("users.id", user_id)
      .first();
    if (user) {
      return user;
    }
    // const specialUser = await db()
    //   .select("special_users.*", "media.title")
    //   .from("special_users")
    //   .leftJoin("media", "special_user.id", "media.model_id")
    //   .where("special_users.id", user_id)
    //   .first();
    // return specialUser;
  },
};

module.exports = userService;
