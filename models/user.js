const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_FACTOR = 10;

//Create User Schema
const userSchema = new Schema({
  role: { type: String },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email_address: { type: String, required: true },
  user_name: { type: String, required: true, index: {unique: true}},
  password: { type: String, required: true}
},
{
  versionKey: false
});

//Middleware to hash password upon changing entry.
userSchema.pre('save', function(next)
{
  var user = this;

  //If the password is not changed, no hashing is neccesary.
  if (!user.isModified('password'))
  { return next();  }

  //Generate salt.
  bcrypt.genSalt(SALT_FACTOR, function(err, salt)
  {
    if (err)
    { return next(err); }

    //Use salt to hash password.
    bcrypt.hash(user.password, salt, function(err, hash)
    {
      if (err)
      { return next(err); }

      //Replace plaintext password with hashed version.
      user.password = hash;
      next();
    });
  });

});

//Method to safely check password is valid for login.
userSchema.methods.checkPassword = function(enteredPassword, callbackFunction)
{
  bcrypt.compare(enteredPassword, this.password, function(err, isValid)
  {
    if (err)
    { return callbackFunction(err, false); }
    callbackFunction(null, true);
  });
};

module.exports = User = mongoose.model('user', userSchema);