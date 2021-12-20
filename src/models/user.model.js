const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
// step 1 :- create the schema for user

const userSchema = new mongoose.Schema(
    {
      email: {type: String, required: true, unique: true},
      Name:{type: String, required: false},
      phoneNumber:{type:Number,required:false},
      address:[{type: String, required: false}],
     
      payment:[{type: String, required: false}],
      username: {
        type: String,
        required: false,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      cartItems: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
          quantity: { type: Number, default: 1 },
          // price: { type: Number, default: 0 },
        },
      ],
      bagItems: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
          // price: { type: Number, default: 0 },
        },
      ],
      active: { type: Boolean, default: false },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

// create and update
userSchema.pre("save", function(next) {
    if(! this.isModified("password")) return next();

    const hash = bcryptjs.hashSync(this.password, 8);
    this.password = hash

    return next();
})

userSchema.methods.checkPassword = function(password) {
    const match = bcryptjs.compareSync(password, this.password);

    return match;
}

// step 2 :- connect the schema to the users collection
const User = mongoose.model("user", userSchema); // users

module.exports = User;


