const date = new Date();

const file = [
  {
    id: 1,
    name: 'cloud_native.jpeg',
    path: 'examples/cloud_native.jpeg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 2,
    name: 'react_joinville.jpeg',
    path: 'examples/react_joinville.jpeg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 3,
    name: 'front_sp.jpeg',
    path: 'examples/front_sp.jpeg',
    created_at: date,
    updated_at: date,
  },
  {
    id: 4,
    name: 'rsxp.png',
    path: 'examples/rsxp.png',
    created_at: date,
    updated_at: date,
  },
  {
    id: 5,
    name: 'london.jpeg',
    path: 'examples/london.jpeg',
    created_at: date,
    updated_at: date,
  },
];

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('files', file, {});
  },
  down: queryInterface => queryInterface.bulkDelete('files', null, {}),
};
