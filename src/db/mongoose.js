const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
})

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error(`Password must not contain the word 'password'`)
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  }
})

const me = new User({
  name: 'Andrew   ',
  email: 'MYEMAIL@ME.IO  ',
  password: 'pass',
  age: 28
})

// me.save().then(() => {
//   console.log(me)
// }).catch((error) => {
//   console.log('Error!', error)
// })

const Tasks = mongoose.model('Tasks', {
  description: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const task = new Tasks({
  description: 'Finish Nodejs Course',
  completed: false
})

task.save().then(() => {
  console.log(nodeCourse)
}).catch((error) => {
  console.log('Error!', error)
})