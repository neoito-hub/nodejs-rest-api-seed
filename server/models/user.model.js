const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config')[process.env.NODE_ENV];

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true
    },
    auth: {
      hash: {
        type: String
      },
      salt: {
        type: String
      }
    }
  },
  { versionKey: false, timestamps: true }
);

// Taken shamelessly from
// https://github.com/gothinkster/node-express-realworld-example-app
/**
 * Use function() instead of () =>, as this will be bound to current
 * scope in latter. Use REGULAR functions!
 * */
UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      exp: parseInt(exp.getTime() / 1000, 0)
    },
    secret
  );
};

UserSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.auth.salt, 10000, 512, 'sha512').toString('hex');
  return this.auth.hash === hash;
};

UserSchema.methods.setPassword = function(password) {
  this.auth = {
    hash: '',
    salt: ''
  };
  this.auth.salt = crypto.randomBytes(16).toString('hex');
  this.auth.hash = crypto
    .pbkdf2Sync(password, this.auth.salt, 10000, 512, 'sha512')
    .toString('hex');
};

UserSchema.methods.toAuthJSON = function() {
  return {
    email: this.email,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model('user', UserSchema);
