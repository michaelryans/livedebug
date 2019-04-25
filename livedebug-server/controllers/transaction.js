const Transaction = require('../models/transaction');

class TransactionController {
  static transfer(req, res) {
    Transaction.create({
      amount: req.body.amount,
      from: req.transferFromId,
      to: req.transferToId
    })
    .then(success => {
      return Transaction.findOne({
        _id: success._id
      })
      .populate({
        path: 'from',
        populate: {
          path: 'userId'
        }
      })
    })
    .then(trans => {
      res.status('201').json(trans);
    })
    .catch(err => {
      if (err.message) {
        res.status(400).json({ err: err.message });
      } else {
        res.status(500).json(err);
      }
    })
  }
}

module.exports = TransactionController
