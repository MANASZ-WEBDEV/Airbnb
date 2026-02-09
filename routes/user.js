const express = require('express');
const router = express.Router(); // mergeParams to access :id from parent route
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
// const ExpressError = require("../utils/ExpressError.js");
// const {reviewSchema} = require("../schema.js");
// const Review = require("../models/review.js");
// const Listing = require("../models/listing.js");
const User = require("../models/user.js");

router.get("/signup", (req, res) =>{
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async(req, res)=>{
    try{

        let {username, email, password} = req.body;
        const newUser = new User({username, email});
        const registeredUser =  await User.register(newUser, password);
        console.log(registeredUser);
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");             
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));  

router.get("/login", (req, res)=>{
    res.render("users/login.ejs");
})

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    res.redirect("/listings");
});
module.exports = router;