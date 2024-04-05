import 'dotenv/config.js';

import Character from './app/models/Character.js';
import User from './app/models/User.js';

const character = new Character();

// User.findAll().then((rows) => {
//   console.log(rows);
// });

// Character.findById(9).then((row) => {
//   console.log(row);
// });

// const data = {
//   name: 'test61',
//   fullname: 'test61',
//   description: 'test61',
//   cost: 100,
//   unlock_requirement: 'test61',
//   weapon_id: 1,
// };

// Character.create(data).then((rows) => {
//   console.log(rows);
// });

// character.update(4, { name: 'tata' }).then((rows) => {
//   console.log(rows);
// });

// character.delete(4).then((rows) => {
//   console.log(rows);
// });

// const user = new User();

// user.findAll().then((rows) => {
//   console.log(rows);
// });

// user.findById(1).then((row) => {
//   console.log(row);
// });

// const data = {
//   username: 'laura',
//   email: 'laura@test.com',
//   password: 'qwertyui',
// };

// user.create(data).then((rows) => {
//   console.log(rows);
// });

const user = {
  username: 'laura',
  password: 'qwertyui',
};

User.update(2, { user }).then((rows) => {
  console.log(rows);
});

// user.delete(2).then((rows) => {
//   console.log(rows);
// });
