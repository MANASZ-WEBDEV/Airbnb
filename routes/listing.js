const express = require('express')
const router = express.Router()
const Listing = require('../models/listing.js')
const wrapAsync = require('../utils/wrapAsync.js')
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js')

// Index Route - to show all listings
router.get(
  '/',
  wrapAsync(async (req, res) => {
    const alllisting = await Listing.find({})
    res.render('listings/index.ejs', { alllisting })
  })
)

// New Route - to show form to create new listing
router.get('/new', isLoggedIn, (req, res) => {
  res.render('listings/new.ejs')
})

// Show Route - to show details of a particular listing
router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params
    const listing = await Listing.findById(id)
      .populate({
        path: 'reviews',
        populate: {
          path: 'author'
        }
      })
      .populate('owner')
    if (!listing) {
      req.flash('error', 'Listing you are looking for does not exist!')
      return res.redirect('/listings')
    }
    res.render('listings/show.ejs', { listing })
  })
)

// Create Route - to create a new listing
router.post(
  '/',
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing) // Fixed: use req.body.listing
    newListing.owner = req.user._id // Set the owner to the logged-in user
    await newListing.save()
    req.flash('success', 'Successfully created a new listing!')
    res.redirect(`/listings`)
  })
)

// Edit Route - to show form to edit a listing
router.get(
  '/:id/edit',
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params
    let listing = await Listing.findById(id)
    if (!listing) {
      req.flash('error', 'Listing you are looking for does not exist!')
      return res.redirect('/listings')
    }
    res.render('listings/edit.ejs', { listing })
  })
)

// Update Route - to update a particular listing

// router.post("/listings/:id", async (req, res)=>{ // Also works but not RESTful
//   const {id} = req.params;
//   await Listing.findByIdAndUpdate(id, req.body, {runValidators:true, new:true});
//   res.redirect(`/listings/${id}`);
// });

// RESTful way
router.put(
  '/:id',
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params
    await Listing.findByIdAndUpdate(id, req.body.listing, {
      // Use req.body.listing
      runValidators: true,
      new: true
    })
    req.flash('success', 'Listing updated successfully!')
    res.redirect(`/listings/${id}`)
  })
)

// Delete Route - to delete a particular listing
router.delete(
  '/:id',
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params
    await Listing.findByIdAndDelete(id)
    req.flash('success', 'Listing deleted successfully!')
    res.redirect('/listings')
  })
)

module.exports = router
