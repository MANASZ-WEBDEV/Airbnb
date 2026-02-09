const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js"); 
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const port = 3000;
app.engine("ejs", ejsMate); // for using ejs-mate as template engine
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); // to use static files like css

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // this helps to parse form data like req.body.title to get title from form
app.use(express.json()); 

const sessionOptions = {
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000 ,
    maxAge: 7 * 24 * 60 * 60 * 1000 ,
    httpOnly: true,
  }
};

app.get("/", (req, res) => {
  // res.send("Hi, I am root!");
  res.redirect("/listings");
});

app.use(session(sessionOptions));
app.use(flash()); 

app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// app.get("/demouser", async (req, res) =>{
//   let fakeUser = new User({ 
//     email: "fake@manas.com",
//     username: "demoUser",
//   });

//   let registeredUser = await User.register(fakeUser, "password123");
//   res.send(registeredUser);
// })

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
}); 

app.use((err, req, res, next) => {
  // Instead of try catch in user.js, we can also handle errors here in a centralized way. But for that we need to check the error type and then redirect accordingly. This is more scalable as we can handle all errors in one place instead of scattering try catch blocks everywhere.
  // Handle user registration errors gracefully
  // if (err.name === "UserExistsError" || err.name === "MissingPasswordError" || err.name === "MissingUsernameError") {
    //   req.flash("error", err.message);
    //   return res.redirect("/signup");
    // } 
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err });
  // res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
