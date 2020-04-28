const User = require("../models/User");
const braintree = require("braintree");
require("dotenv").config();

//connect to braintree
const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
exports.generateToken = (req, res) => {
  //use gateway to generate token
  //https://developers.braintreepayments.com/reference/request/client-token/generate/node
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromClient = req.body.paymentMethodNonce;
  let amountFromClient = req.body.amount;
  //charge the user
  let newTransaction = gateway.transaction.sale(
    {
      amount: amountFromClient,
      paymentMethodNonce: nonceFromClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};