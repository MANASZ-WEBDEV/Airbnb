const express = require('express')
const router = express.Router()
const wrapAsync = require('../utils/wrapAsync.js')
const listing = require('../models/listing.js')
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js')
const listingController = require('../controllers/listings.js')
const multer = require('multer')
const { storage } = require('../cloudConfig.js')
// const upload = multer({ dest: 'uploads/' }) // for local storage, comment this line when using cloudinary
const upload = multer({ storage }) // for cloudinary, comment this line when using local storage
router
  .route('/')
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, 
    upload.single("listing[image]"), 
    validateListing, 
    wrapAsync(listingController.createListing)
  );

// New Route - to show form to create new listing
router.get('/new', isLoggedIn, listingController.renderNewForm)

router
  .route('/:id')
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))

// Edit Route - to show form to edit a listing
router.get(
  '/:id/edit',
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
)

module.exports = router;