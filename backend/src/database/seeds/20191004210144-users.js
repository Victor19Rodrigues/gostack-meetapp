const faker = require('faker');

const date = new Date();

const users = [];

for (let id = 1; id <= 50; id += 1) {
  users.push({
    id,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password_hash:
      '$2a$08$Jvp1LsOfs4hwF.YneSUPpezHgL655TK8IuYisEDWV5ejkPH3Ckhbi',
    created_at: date,
    updated_at: date,
    avatar_id: null,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "users_id_seq" RESTART WITH ${users.length + 1}`
    );
  },
  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
