
const express = require('express');

const passport = require("./configs/passport")

const {register, login} = require("./controllers/auth.controller")
const productController = require("./controllers/product.controller")
const userController=require("./controllers/user.controller")

const paymentController=require("./controllers/payment.controller")
const adressController=require("./controllers/address.controller")


const bagController = require("./controllers/bag.controller.js");
const productDetailsController = require("./controllers/productDetails.controller");
const cartController = require("./controllers/cart.controller");



const app = express();

app.use(express.json({ extended: false }));

app.use(passport.initialize());

passport.serializeUser(function({user, token}, done) {
    done(null, {user, token});
});
  
passport.deserializeUser(function({user, token}, done) {
    done(err, {user, token});
});

app.get("/auth/google/failure", function(req, res) {
    return res.send("Something went wrong");
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/google/failure'
}), function(req, res) {
    const {user, token} = req.user
   return res.redirect('http://localhost:3000/' + "?"+ token);
   token=""
//    return res.status(200).json({user, token });
});






/*
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail"
  })
);

app.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

app.get("/", (req, res) => {
    const {user, token} = req.user
    return res.redirect('http://localhost:3000/Intrest' + "?"+ token);
    token=""
});





*/












app.post("/register", register);
app.post("/login", login);
app.use("/products", productController)

app.use("/cart", cartController);
app.use("/bag", bagController);

app.use("/productDetail", productDetailsController);


app.use('/payment', paymentController)
app.use('/address', adressController)

app.use('/users', userController);


module.exports = app;