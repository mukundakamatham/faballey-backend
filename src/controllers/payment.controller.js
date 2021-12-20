const express = require ("express");

const User = require("../models/user.model")

const authenticate = require('../middlewares/authenticate')

const router = express.Router();


router.get("/", authenticate,async (req, res) => {
    try {
      const el = await User.findById(req.user._id,).lean().exec();
      console.log(el.payment);
      return res.send(
        el.payment
     );
    } catch (error) {
      res.send(error.message);
    }
  });
  router.patch("/update",authenticate,async function (req, res) {
    const item = await User.findByIdAndUpdate(req.user._id,    { payment: req.body.payment }, {new: true}).lean().exec();
    return res.status(200).send({item}); 
 })
  module.exports = router;