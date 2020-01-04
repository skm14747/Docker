const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    require: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        console.log('incorrect email');

        throw new Error('Please enter the correct email');
      }
    }
  },
  password: {
    type: String,
    require: true,
    trim: true,
    validate(value) {
      if (value.length < 6) {
        throw new Error('password length is less than 6');
      } else if (value.toLowerCase() == 'password') {
        throw new Error('password can not be ' + value);
      }
    }
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        return new Error('age can not be less than 0');
      }
    }
  }
});

userSchema.statics.findByCredentials = async (email, password) => {
  console.log(email);

  const user = await User.findOne({ email: email });
  console.log('User ' + user);

  if (!user) {
    throw new Error('No User exists with email ' + email);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);

  if (!isMatch) {
    console.log(isMatch);

    throw new Error('Please enter correct password');
  }

  return user;
};

userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  console.log('just before saving');

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
