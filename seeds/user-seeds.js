const bcrypt = require('bcrypt');
const { User } = require('../models');

const userData = [
  {
    userName: 'babysitter1',
    email: 'bbsit@example.com',
    password: bcrypt.hashSync('password123', 10),
    firstName: 'Toni',
    lastName: 'Braxton',
    phoneNumber: '777-242-2222',
    address: '123 Main St, Portland, Oregon 97221',
    bio: 'I am Toni and I love singing and babysitting.',
  },
  {
    userName: 'Parent1',
    email: 'parent1@example.com',
    password: bcrypt.hashSync('password456', 10),
    firstName: 'Al',
    lastName: 'Jorgenson',
    phoneNumber: '666-666-6666',
    address: '666 Elm St, Salem, Massachusetts 01915',
    bio: 'I enjoy making music and spending time with my kids.',
  },
  {
    userName: 'babysitter2',
    email: 'sitter2@example.com',
    password: bcrypt.hashSync('password789', 10),
    firstName: 'Linda',
    lastName: 'Smith',
    phoneNumber: '555-555-5555',
    address: '789 Oak St, Los Angeles, California 90001',
    bio: 'Hello, I am Linda, and I have a passion for arts and crafts. Babysitting is my way of spreading creativity!',
  },
  {
    userName: 'Parent2',
    email: 'parent2@example.com',
    password: bcrypt.hashSync('password012', 10),
    firstName: 'Kate',
    lastName: 'Roberts',
    phoneNumber: '123-456-7890',
    address: '456 Maple St, Seattle, Washington 98101',
    bio: 'I love exploring the outdoors with my children. We enjoy hiking, camping, and discovering new places together.',
  },
  {
    userName: 'babysitter3',
    email: 'sitter3@example.com',
    password: bcrypt.hashSync('password345', 10),
    firstName: 'Michael',
    lastName: 'Johnson',
    phoneNumber: '999-999-9999',
    address: '345 Pine St, Chicago, Illinois 60601',
    bio: 'Hi, I\'m Michael! I\'m a babysitter who believes in fostering a creative and nurturing environment for kids.',
  },
  {
    userName: 'Parent3',
    email: 'parent3@example.com',
    password: bcrypt.hashSync('password678', 10),
    firstName: 'Emily',
    lastName: 'Williams',
    phoneNumber: '987-654-3210',
    address: '678 Cedar St, New York, New York 10001',
    bio: 'My family enjoys cooking together. We like experimenting with new recipes and creating delicious meals.',
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
