const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://mongo:27017/task-manager-api', { useNewUrlParser: true });



// const user = new User({
//   name: 'xyz',
//   email: 'xyzk',
//   password: 'PassWrd',
//   age: 24
// });

// user
//   .save()
//   .then(() => {
//     console.log(user);
//   })
//   .catch(() => {
//     console.log('error while saving user');
//   });

// const Task = mongoose.model('Task', {
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// });

// const task = new Task({
//   description: 'have to go to the gym',
//   completed: false
// });

// task
//   .save()
//   .then(() => {
//     console.log(task);
//   })
//   .catch(() => {
//     console.log('error while saving');
//   });
