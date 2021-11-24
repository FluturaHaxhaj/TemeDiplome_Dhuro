const faker = require("faker");
const { hashPassword } = require("../helpers/passwordHash");

const password = "123456";

const createFakeUser = () => ({
  id: faker.datatype.uuid(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email().toLowerCase(),
  phone_number: faker.phone.phoneNumber(),
  address: faker.address.streetAddress(),
});

// const createFakeSpecialUser = () => ({
//   id: faker.datatype.uuid(),
//   name: faker.name.firstName() + faker.name.lastName(),
//   function: faker.company.suffixes(),
//   email: faker.internet.email().toLowerCase(),
//   address: faker.address.streetAddress(),
// });

exports.seed = async (knex) => {
  await knex("users").insert({
    id: "12368021-18ef-4f8b-9594-2f283db90982",
    first_name: "Flutura",
    last_name: "Haxhaj",
    email: "flutra@kutia.net",
    address: "Ulpiane Prishtine",
    phone_number: "048180590",
    password: await hashPassword(password),
  });
  await knex("users").insert({
    id: "447079a1-323e-4bd8-8c14-c1cbcf122bc2",
    first_name: "Enis",
    last_name: "Berisha",
    email: "enis@kutia.net",
    address: "Muharrem Fejza Prishtine",
    phone_number: "048100590",
    password: await hashPassword(password),
  });

  // await knex("special_users").insert({
  //   name: "Filan fisteku",
  //   email: "filam@fisteku.com",
  //   function: "Charity",
  //   address: "Muharrem Fejza Prishtine",
  //   password: await hashPassword(password),
  // });

  await knex("categories").insert({
    id: "9ff5a67f-7bba-4554-8eac-9aebe696d41d",
    name: "Ushqime",
  });

  await knex("categories").insert({
    id: "9cb5641b-4baa-489e-9d06-c98cd2684448",
    name: "Veshje",
  });

  await knex("categories").insert({
    id: "fe76e64f-950a-4f04-9662-f2b9b2266f65",
    name: "Libra",
  });
  await knex("categories").insert({
    id: "e70e3c30-6560-4f67-b384-6f5094b9043c",
    name: "Mobilje ",
  });
  await knex("categories").insert({
    id: "ecc49bdc-009f-4439-b97e-3b7cb3f00684",
    name: "Pajisje shtepiake",
  });

  await knex("categories").insert({
    id: "c0b04632-a6f2-4ca7-be15-9bba6a3f5b7d",
    name: "Te tjera",
  });

  const fakeUsers = [];
  for (let i = 0; i < 10; i++) {
    let fakeUser = createFakeUser();
    fakeUser = {
      ...fakeUser,
      password: await hashPassword(password),
    };
    fakeUsers.push(fakeUser);
  }
  // const special_users = [];
  // for (let i = 0; i < 10; i++) {
  //   let fakeSpecialUser = createFakeSpecialUser();
  //   fakeSpecialUser = {
  //     ...fakeSpecialUser,
  //     password: await hashPassword(password),
  //   };
  //   special_users.push(fakeSpecialUser);
  // }

  await knex("users").insert(fakeUsers);
  // await knex("special_users").insert(special_users);
};
