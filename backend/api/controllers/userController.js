const UserService = require("../services/userService");

const { sendMail, forgotPasswordMail } = require("../../helpers/sendEmail");

const { handlePromiseRejectionError } = require("../../helpers/errorHelpers");
const { validateRequest } = require("../../helpers/validationHelpers");

const userRegister = async (req, res) => {
  try {
    validateRequest(req);

    const user = await UserService.createUser(req.body);

    if (user.first_name) {
      sendMail(user.email, user.token, user.first_name, user.last_name);
    } else {
      sendMail(user.email, user.token, user.name, user.function);
    }

    return res.json({ user });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const login = async (req, res) => {
  try {
    validateRequest(req);

    const user = await UserService.login(req.body);

    return res.json(user);
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const uploadProfile = async (req, res) => {
  try {
    validateRequest(req);

    const upload = await UserService.upload(req.file, req.user.id);

    return res.json({ upload });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const updateProfile = async (req, res) => {
  try {
    validateRequest(req);

    const updatedProfile = await UserService.updateUser(
      req.body,
      req.file,
      req.user.id
    );

    return res.json({ updatedProfile });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const changePassword = async (req, res) => {
  try {
    validateRequest(req);

    await UserService.changePassword(
      req.user.id,
      req.body.old_password,
      req.body.new_password
    );

    return res.json({ success: "Password was changed successfully!" });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const forgotPassword = async (req, res) => {
  try {
    validateRequest(req);
    const userExists = await UserService.forgotPassword(req.body.email);
    forgotPasswordMail(
      req.body.email,
      (email = userExists.first_name ? userExists.first_name : userExists.name),
      userExists.password
    );
    return res.json({ success: "Email Sent" });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    validateRequest(req);

    const user = await UserService.deleteUser(req.user.id);

    return res.json({ user });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserService.getAllUsersFiltered(req.query);

    return res.json(allUsers);
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const user = await UserService.getUserDetails(req.user.id);

    return res.json({ user });
  } catch (err) {
    return handlePromiseRejectionError(err, res);
  }
};

module.exports = {
  userRegister,
  login,
  updateProfile,
  uploadProfile,
  changePassword,
  forgotPassword,
  deleteUser,
  getAllUsers,
  getLoggedInUser,
};
