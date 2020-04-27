const Meme = require('./meme');
const User = require('./user');
const Comment = require('./comment');
const Notification = require('./notification');
const Ad = require('./ad');
const Template = require('./template');

module.exports = () => {};
//   User.create({
//     firstName: 'Essam',
//     lastName: 'Harous',
//     username: 'esso',
//     password: 'e2f33j',
//     email: 'dlfslfj@gmail.com',
//     isAdmin: true,
//   }).then((res) => {
//     console.log(res);
//   });

// Ad.create({
//   header: 'sdff',
//   imageUrl: 'sfdsf',
//   link: 'sdf',
//   content: 'sdffs',
// }).then((res) => {
//   console.log(res);
// });

//   Template.create({
//     templateUrl: 'sldjlfsjlfdj',
//     userId: '5ea33727fc86901b8ca40344',
//   }).then((res) => {
//     console.log(res);
//   });

// Meme.create({
//     memeUrl: 'sdffs',
//     userId: '5ea33727fc86901b8ca40344',
//     content: 'sfdfljlksjdklfjklsjfdlsjdfl',
//     templateId: '5ea33a597ab3dc06a03fae5e',
//   }).then((res) => {
//     console.log(res);
//   });

// Comment.create({
//     memeId: '5ea33afc18747a16708f3441',
//     userId: '5ea337183449070a5ce314ef',
//     content: 'sfdfljlksjdklfjklsjfdlsjdfl',
//     date: Date(),
//   }).then((res) => {
//     console.log(res);
//   });

// Notification.create({
//     senderId: '5ea337183449070a5ce314ef',
//     receiverId: '5ea33727fc86901b8ca40344',
//     memeId: '5ea33afc18747a16708f3441',
//     type: 'comment',
//     date: Date(),
//   }).then((res) => {
//     console.log(res);
//   });

//updates
//   Meme.findByIdAndUpdate('5ea33afc18747a16708f3441', {
//     $push: { comments: '5ea33ba8b2b36c1fc85c2165' },
//   }).then((res) => {
//     console.log(res);
//   });

//   User.findByIdAndUpdate('5ea33727fc86901b8ca40344', {
//     $push: { comments: '5ea33acefeb0180cc41ce20a' },
//   }).then((res) => {
//     console.log(res);
//   });
