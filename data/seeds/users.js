const fs = require("fs");
const faker = require("faker");
const bcrypt = require("bcryptjs");

const createFakeUser = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  username: faker.internet.userName(),
  password: faker.internet.password()
});

exports.seed = async function(knex, Promise) {
  const fakeUsers = [];

  for (let i = 0; i < 100; i++) {
    fakeUsers.push(createFakeUser());
  }
  console.log(fakeUsers);

  fs.writeFileSync("./authTestInfo.json", JSON.stringify({ users: fakeUsers }));

  fakeUsers.map(user => {
    user.password = bcrypt.hashSync(user.password, 8);
  });

  return await knex("users").insert(fakeUsers);
};