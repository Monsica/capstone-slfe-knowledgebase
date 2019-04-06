const express = require('express');
var cookieParser = require('cookie-parser');
const router = express.Router();

router.use(cookieParser());

//User Model
const User = require('../../models/user');

router.post('/loginRequest', (req, res) =>
{
  console.log("inside loginRequest router.post");


  // user login data from post request
  let usersName = req.body.user_name;
  let usersPassword = req.body.password;

  // Search database for username
  User.findOne({ user_name: usersName }, function(err, user)
  {
    if(err)
    {
      res.json({success: false, message: 'an error occured'})
      next();
    }

    user.checkPassword(usersPassword, function(errr, isMatch)
    {
      if(true == isMatch)
      {
        res.json({success: true, message: ''})
        //create and set cookie
        //res.cookie("userData", {user_name: user.user_name, role: user.role});
        //res.send('user data added to cookie');
        //res.send(req.cookies);
        console.log("Data matches! Login successful.");
      }
      else
      {
        res.json({success: false, message: 'an error occured'})
        console.log("ERROR on login at router.post");
      }
    });

  });
});


router.post('/newUserRequest', (req, res) => {
	let new_user = new User(req.body);
	new_user.save().then(user => res.json(user));
});

module.exports = router;
