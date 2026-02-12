const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access :id from parent route
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

// Reviews 
// POST Route
router.post("/", isLoggedIn, validateReview ,wrapAsync( async(req, res) =>{
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id; // Set the author to the logged-in user
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "Review added successfully!");
  res.redirect(`/listings/${listing._id}`); 
}))

// Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor,  wrapAsync( async(req, res) =>{
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
}));

module.exports  = router;