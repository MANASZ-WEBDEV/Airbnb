const Listing = require('../models/listing')

module.exports.index = async (req, res) => {
  const alllisting = await Listing.find({})
  res.render('listings/index.ejs', { alllisting })
}

module.exports.renderNewForm = (req, res) => {
  res.render('listings/new.ejs')
}

module.exports.showListing = async (req, res) => {
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
}

module.exports.createListing = async (req, res, next) => {
  let url = req.file ? req.file.path : null; // Get the image URL from Cloudinary if uploaded
  let filename = req.file ? req.file.filename : null; // Get the filename from Cloudinary if uploaded
  const newListing = new Listing(req.body.listing) // Fixed: use req.body.listing
  newListing.owner = req.user._id // Set the owner to the logged-in user
  // if (url && filename) {
    newListing.image = {
      url: url,
      filename: filename
    }
  // }
  await newListing.save()
  req.flash('success', 'Successfully created a new listing!')
  res.redirect(`/listings`)
}

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params
  let listing = await Listing.findById(id)
  if (!listing) {
    req.flash('error', 'Listing you are looking for does not exist!')
    return res.redirect('/listings')
  }
  res.render('listings/edit.ejs', { listing })
}

module.exports.updateListing = async (req, res) => {
  const { id } = req.params
  await Listing.findByIdAndUpdate(id, req.body.listing, {
    // Use req.body.listing
    runValidators: true,
    new: true
  })
  req.flash('success', 'Listing updated successfully!')
  res.redirect(`/listings/${id}`)
}

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params
    await Listing.findByIdAndDelete(id)
    req.flash('success', 'Listing deleted successfully!')
    res.redirect('/listings')
  }