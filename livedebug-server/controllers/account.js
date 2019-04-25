const Account = require('../models/account');

class AccountController {
  static findAccounts(req, res) {
    // console.log('masuk find account')
    Account.findOne({ accountNumber: req.params.accountNumber })
     .populate('userId')
    //  .populate('userId')
     .then(account => {
       console.log(account)
       console.log('------acount')
       res.status(200).json(account);
     })
     .catch(err => {
       res.status(500).json(err);
     })
  }

  static newAccount(req, res) {
    let acc = null;
    // console.log(req.body)
    // console.log('------')
    // console.log(req.user)
    // console.log('masuk new account')
    if (req.body.hasOwnProperty('balance')) {
      acc = {
        balance: req.body.balance,
        userId: req.user._id
      }
    } else {
      acc = {
        userId: req.user._id
      }
    }
    // console.log('----------acc')
    // console.log(acc)

    Account.create(acc)
     .then(account => {
      //  console.log(account)
      //  console.log('success create account')
       res.status(201).json(account);
     })
     .catch(err => {
      //  console.log(err)
      //  console.log('error new account')
       res.status(500).json(err);
     })
  }

  static remove(req, res) {
    Account
     .deleteOne({
       accountNumber: req.params.accountNumber
     })
     .then(deleted => {
       res.status(200).json(deleted);
     })
     .catch(err => {
       res.status(500).json(err);
     })
  }

}

module.exports = AccountController
