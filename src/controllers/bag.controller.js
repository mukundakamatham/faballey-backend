const express = require("express");

const Bag = require("../models/bag.model");

const User = require("../models/user.model");

const Product = require("../models/product.model");

const authenticate = require('../middlewares/authenticate')
const router = express.Router();

// router.get("/", (req, res) => {
//   return res.send("empty BAG");
// });

router.get("/",authenticate, async (req, res) => {
  try {
    let userId=req.user._id
    let user = await User.findById(userId);

    let bag = user.bagItems;

    // if (bag.length === 0) {
    //   return res.send(["empty BAG"]);
    // }

    // console.log(bag);

    let prodArr = [];
    for (let i = 0; i < bag.length; i++) {
      let product = await Product.findById(bag[i].productId);
      prodArr.push([product, 1]);
    }

    return res.send({ items: prodArr });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/add",authenticate, async (req, res) => {
  let {  prodId } = req.body;
  let userId=req.user._id

  // console.log(userId,"asd")
  let user = await User.findById(userId).lean().exec();
  //let user = await User.findById(userId).lean().exec();
console.log("user",user)
  let bag = user.bagItems;
  if (bag.length == 0) {
    user = await User.findByIdAndUpdate(
      userId,
      { bagItems: [...bag, { productId: prodId }] },
      { new: true }
    )
      .lean()
      .exec();
    return res.json(user);  }
  for (let i = 0; i < bag.length; i++) {
    if (bag[i].productId == prodId) {
      return res.send("Item Already Added");
    }
  }

  user = await User.findByIdAndUpdate(
    userId,
    { bagItems: [...bag, { productId: prodId }] },
    { new: true }
  )
    .lean()
    .exec();
  return res.json(user);
});

router.post("/deleteItem/",authenticate, async (req, res) => {
  let {  prodId } = req.body;
  let userId=req.user._id
  let user = await User.findById(userId).lean().exec();

  let bag = user.bagItems;

  let newBag = bag.filter((item) => {
    return item.productId != prodId;
  });

  user = await User.findByIdAndUpdate(
    userId,
    { bagItems: newBag },
    { new: true }
  )
    .lean()
    .exec();
  return res.json(user);
});

module.exports = router;