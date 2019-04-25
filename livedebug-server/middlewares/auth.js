const jwt = require('../helpers/token');
const User = require('../models/user');
const Account = require('../models/account');
const Transaction = require('../models/transaction');

module.exports = {
  authentication: function(req, res, next) {
    let token = req.headers.token;

    // console.log('masuk auth')
    if (!token) {
      // console.log('masuk 1')
      res.status(401).json({ error: 'You must login to access this endpoint' });
    } else {
      // console.log('masuk else middle authent')
      let decoded = jwt.verify(token);
      User
       .findOne({
         email: decoded.email
       })
       .then(user => {
         if(user) {
           req.user = user;
           next();
         } else {
           res.status(401).json({ err: 'User is not valid' });
         }
       })
       .catch(err => {
         res.status(500).json(err)
       })
    }
  },
  authorization: function(req, res, next) {
    let accountNumber = null;
    // console.log(req.params)
    // console.log('---------------')
    // console.log(req.body)

    if (req.params.accountNumber) {
      accountNumber = req.params.accountNumber
    } else {
      accountNumber = req.body.accountNumber
    }
    // console.log(accountNumber, 'accnum--------')
    Account.findOne({
      accountNumber: accountNumber
    })
     .then(account => {
      //  console.log(account.userId)
      //  console.log('123123123123')
      //  console.log(req.user._id)
       if (account.userId.toString() === req.user._id.toString()) {
         req.transferFromId = account._id;
        //  console.log('masuk seneee')
         next();
       } else {
         res.status(403).json({ err: 'Forbidden' });
       }
     })
     .catch(err => {
       res.status(500).json(err)
     })
  },
  authForTransfer: function(req, res, next) {
    // console.log('masuk ke authfor transfer')
    console.log(req.body.accountNumberTo)
    console.log('------req.body')
    Account.findOne({
      accountNumber: req.body.accountNumberTo
    })
    .then(account => {
      console.log('account auth - for transfer')
      console.log(account)
      if(account) {
        req.transferToId = account._id;
        next();
      } else {
        res.status(400).json({ err: 'Your destination account number is invalid' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}
