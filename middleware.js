const Listing = require('./models/listing.js');
const Review = require('./models/review.js');                                       
const { listingSchema, reviewSchema } = require('./schema.js');
const ExpressError = require('./utils/ExpressError.js');

module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        // Save the original URL the user was trying to access
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
};

module.exports.savedRedirectUrl = (req, res, next) =>{
    // If there's a saved URL in the session, make it available in res.locals for the next middleware or route handler
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);  // Validate the entire req.body against the schema
  if (error) {
    // let errMsg = error.details.map((el) => el.message).join(", ");
    return next(new ExpressError(400, error ));  // Must use next() not throw
  }else{
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    return next(new ExpressError(400, error));
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};