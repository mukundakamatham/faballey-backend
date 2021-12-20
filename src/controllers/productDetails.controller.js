const express = require ("express");

const Product = require("../models/product.model.js");

const router = express.Router();


router.get("/:id", async (req, res) => {
    try {
      const el = await Product.findById(req.params.id).lean().exec();
      console.log(el);
      return res.send(
        el
     );
    } catch (error) {
      res.send(error.message);
    }
  });

  module.exports = router;