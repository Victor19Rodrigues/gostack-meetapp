const date = new Date();

const description = `If you're working with React and/or React Native, or interested in learning, this group is for you! We meet every month to discuss progress with React, new tools, features and libraries`;
const location = 'Av. Nove de Julho, 3186 - Jardim Paulista, São Paulo - SP';

const meetapps = [
  {
    id: 1,
    title: 'Cloud Native São Paulo - Meetapp #12',
    description,
    location,
    date: '2019-12-28T18:00:00.000Z',
    file_id: 1,
    user_id: 1,
    updated_at: date,
    created_at: date,
  },
  {
    id: 2,
    title: 'React Joinville 2019',
    description,
    location,
    date: '2019-11-30T18:00:00.000Z',
    file_id: 2,
    user_id: 1,
    updated_at: date,
    created_at: date,
  },
  {
    id: 3,
    title: 'Frontend SP Meetapp',
    description,
    location,
    date: '2019-12-12T15:00:00.000Z',
    file_id: 3,
    user_id: 2,
    updated_at: date,
    created_at: date,
  },
  {
    id: 4,
    title: 'Rocketseat Experience',
    description,
    location,
    date: '2019-11-25T07:00:00.000Z',
    file_id: 4,
    user_id: 2,
    updated_at: date,
    created_at: date,
  },
  {
    id: 5,
    title: 'React Native London',
    description,
    location,
    date: '2019-11-11T18:00:00.000Z',
    file_id: 5,
    user_id: 5,
    updated_at: date,
    created_at: date,
  },
];

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('meetapps', meetapps, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "meetapps_id_seq" RESTART WITH ${meetapps.length + 1}`
    );
  },
  down: queryInterface => queryInterface.bulkDelete('meetapps', null, {}),
};
