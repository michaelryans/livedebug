const User = require('../models/user');
const regis = require('../helpers/register');
const jwt = require('../helpers/token');


class UserController {
  static register(req, res) {
    let user_ = {
      email: req.body.email,
      password: req.body.password
    };

    // console.log(user)
    // console.log('--------------------------')
    // console.log(User)

    User.create(user_)
    .then(user => {
      // console.log('masuk sini')
      // user.verificationCode = '12345a'
      res.status(201).json(user);
    })
    .catch(err => {
      // console.log('err creat user') 
      // console.log(err)
      if (err.errors.email) {
        res.status(409).json({ err: err.errors.email.reason });
      } else if(err.errors.password) {
        res.status(409).json({ err: err.errors.password.message });
      } else {
        res.status(500).json(err);
      }
    })
  }

  static login(req, res) {
    // console.log(req.body)
    // console.log('-----login')

    // console.log(req.body.email)
    // console.log(req.body.password)
    User
     .findOne({email:req.body.email})
     .then(user => {
       console.log('user')
       console.log(user)
       if (user) {
         if (regis.checkPassword(req.body.password, user.password)) {
           let signUser = {
              id: user._id,
              email: user.email
           };

           let token = jwt.sign(signUser);
          //  console.log(token)
          //  console.log('----token login ')
           res.status(200).json({
             token: token,
             _id: user._id,
             email: user.email,
           })
           
         }
       } else {
         res.status(500).json({ err: "User not found" });
       }
     })
     .catch(err => {
       res.status(500).json(err);
     })
  }

  static verify(req, res) {
    // console.log(req.body.email)
    // console.log(req.body.verificationCode)
    // // console.log(req.body)
    // console.log('-----------verify user')
    User
     .findOneAndUpdate({
       email: req.body.email,
       verificationCode: req.body.verificationCode
     }, {
       $set: { isVerified: true }
     }, {new:true})
     .then(user => {
      //  console.log(user)
      //  console.log('-----then verify user')

       
       if(user) {
         res.status(200).json(user);
       } else {
         res.status(400).json({ err: 'Verification code not match'})
       }
     })
     .catch(err => {
       res.status(500).json(err);
     })
  }
}

module.exports = UserController
