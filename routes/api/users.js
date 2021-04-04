const express= require('express')
const router= express.Router();
const { check, validationResult } = require('express-validator');
const User= require('../../models/Users')
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const normalize = require('normalize-url');
// @desc      Get all users
// @route     GET /api/users
// @access    Public


router.get("/", (req,res,next)=>{
    res.status(200).json({message: "Getting all the data of the users"})
})


// @desc      create new users
// @route     GET /api/users
// @access    Public


router.post("/", check('name', 'Name is required').notEmpty(),
                check('email', 'Please include a valid email').isEmail(),
                check('password','Please enter a password with 6 or more characters').isLength({ min: 6 })
                ,async(req,res,next)=>{
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  try{
      //see if user alredy exit or not
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      //get users gravatar:
      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password
      });

      //Encryt password:
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return jsonwebtoke
      res.send(user);

  }
  catch(err){
    console.log(err.message)
    res.send("Server Error")
  }


  console.log(req.body.name)
  console.log(req.body.email)
  console.log(req.body.password)
    res.status(200).json({message: "reee"})
})

module.exports =router;