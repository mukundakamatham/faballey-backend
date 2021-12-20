// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     title: {type: String, required: true},
//     tags:[{type:String,required:true}],
//     image_url: [{type: String, required: true}],
//     price:{type:String,required:true},
//     size:{type:String,required:true},
//     discount:{type:Number,required:true},
// }, {
//     versionKey: false,
//     timestamps: true
// })

// module.exports = mongoose.model("product", productSchema); // products



const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        brandName: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: false },
        image: [{type: String, required: true}],
        discount: { type: Number, required: true },
        sizes: [{ type: String, required: false }], // sizes: ["s,m,l"],
        color: { type: String, required: false },
        gender: { type: String, required: true },
        status:{type:Boolean,required:false}

      },
      {
        versionKey: false,
        timestamp: true,
      }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;