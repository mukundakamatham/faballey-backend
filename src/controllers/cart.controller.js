const express = require("express");

const cart = require("../models/cart.model");

const User = require("../models/user.model");

const Product = require("../models/product.model");

const authenticate = require('../middlewares/authenticate')
const router = express.Router();

// router.get("/",authenticate, (req, res) => {
//   return res.send("empty cart");
// });

router.get("/",authenticate, async (req, res) => {
  try {
    let userId=req.user._id
    let user = await User.findById(userId);

    let cart = user.cartItems;

    // if (cart.length === 0) {
    //   return res.send(["empty cart"]);
    // }

    // console.log(cart);

    let prodArr = [];
    for (let i = 0; i < cart.length; i++) {
      let product = await Product.findById(cart[i].productId);
      prodArr.push([product, 1]);
    }

    return res.send({ items: prodArr });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/add", authenticate,async (req, res) => {
  let {  prodId } = req.body;
  let userId=req.user._id
  let user = await User.findById(userId).lean().exec();

  let cart = user.cartItems;
if(cart.length===0){
  user = await User.findByIdAndUpdate(
    userId,
    { cartItems: [...cart, { productId: prodId }] },
    { new: true }
  )
    .lean()
    .exec();
  return res.json(user);
}
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId == prodId) {
      return res.send("Item Already Added");
    }
  }

  user = await User.findByIdAndUpdate(
    userId,
    { cartItems: [...cart, { productId: prodId }] },
    { new: true }
  )
    .lean()
    .exec();
  return res.json(user);
});

router.post("/deleteItem/",authenticate, async (req, res) => {
  let { prodId } = req.body;
 let userId=req.user._id
  let user = await User.findById(userId).lean().exec();

  let cart = user.cartItems;

  let newcart = cart.filter((item) => {
    return item.productId != prodId;
  });

  user = await User.findByIdAndUpdate(
    userId,
    { cartItems: newcart },
    { new: true }
  )
    .lean()
    .exec();
  return res.json(user);
});

module.exports = router;