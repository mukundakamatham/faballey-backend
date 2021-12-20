const express = require ("express");

const Product = require("../models/product.model.js");

const router = express.Router();

router.post("/", async (req, res) => {
    const product = await Product.create(req.body);
    //console.log("create")
    res.send(product);
  });
 

  router.get("/", async (req, res) => {
   // console.log("def");
   
    const products = await Product.find().lean().exec();
    // res.send({products});
    res.send(products)
  });


  router.get("/type/:id", async (req, res) => {
    //console.log("req:", req.params.id);
    const products = await Product.find({ category : {$eq:`${req.params.id}`}}).lean().exec();
    // console.log({products});
     
      res.send(products);
    
  });

  router.get("/brand/:id", async (req, res) => {
    console.log("req:", req.params.id);
    const products = await Product.find({ brandName : {$eq:`${req.params.id}`}}).lean().exec();
    // console.log({products});
    
      res.send(products);
    
  });

  router.get("/sort/:category/", async (req, res) => {
    const products = await Product.find().lean().exec();

    products.sort(function (a, b) {
      return (b.price * (100 - b.discount) / 100) - (a.price * (100 - a.discount) / 100)
    })
    res.send(products);
  });

  router.get("/sort/:category/", async (req, res) => {
    const products = await Product.find().lean().exec();

    products.sort(function (a, b) {
      return (a.price * (100 - a.discount) / 100) - (b.price * (100 - b.discount) / 100)
    })
    res.send(products);
  })

  router.get("/sort/:discount/", async (req, res) => {
    const Products = await Product.find().lean().exec();

    products.sort(function (a, b) {
      return (a.discount - b.discount)
    })
    res.send(products);

  })
  router.get("/type/all/", async (req, res) => {
    const products = await Product.find().lean().exec();
    // res.send({products});
    
    res.send( products)
  
  })
  
router.get("/price/:x/:y/:category/", async (req, res) => {
    const products = await Product.find({ category: req.params.category, gender: "men" }).lean();
    //   res.json(products);
    let newproducts = products.filter(function (el) {
      return el.price * ((100 - el.discount) / 100) < req.params.x && el.price * ((100 - el.discount)) / 100 > req.params.y;
    });
    return res.send( {
      products: newproducts,
    });
  });
  
  
  module.exports = router;