const Listing = require('../models/listing')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapBoxToken = process.env.MAP_BOX_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapBoxToken })

module.exports.index = async (req, res) => {
  const { category, q } = req.query;
  let filter = {};
  if (category) {
    filter.category = { $in: [category] };
  }
  if (q && q.trim() !== '') {
    // Utilize the text index for broad searching
    filter.$text = { $search: q };
  }
  const alllisting = await Listing.find(filter);
  res.render('listings/index.ejs', { alllisting, selectedCategory: category || '', q });
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
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location, // Use the location from the form input
      limit: 1
    })
    .send()

  let url = req.file ? req.file.path : null // Get the image URL from Cloudinary if uploaded
  let filename = req.file ? req.file.filename : null // Get the filename from Cloudinary if uploaded
  // Ensure category is always an array
  if (req.body.listing.category && !Array.isArray(req.body.listing.category)) {
    req.body.listing.category = [req.body.listing.category];
  }
  const newListing = new Listing(req.body.listing)
  newListing.owner = req.user._id // Set the owner to the logged-in user
  if (url && filename) {
    newListing.image = {
      url: url,
      filename: filename
    }
  }
  
  newListing.geometry = response.body.features[0].geometry // Set the geometry from Mapbox response

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
  let originalImageUrl = listing.image.url
  originalImageUrl = originalImageUrl.replace('/upload', '/upload/w_250') // Resize the image to width 300px
  res.render('listings/edit.ejs', { listing, originalImageUrl })
}

module.exports.updateListing = async (req, res) => {
  const { id } = req.params
  const listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    runValidators: true,
    new: true
  })
  // If location has changed, update geometry using Mapbox
  if (req.body.listing && req.body.listing.location) {
    const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
    const mapBoxToken = process.env.MAP_BOX_TOKEN;
    const geocodingClient = mbxGeocoding({ accessToken: mapBoxToken });
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
      .send();
    if (response.body.features && response.body.features.length > 0) {
      listing.geometry = response.body.features[0].geometry;
      await listing.save();
    }
  }
  if (req.file) {
    const url = req.file.path
    const filename = req.file.filename
    listing.image = { url, filename }
    await listing.save()
  }
  req.flash('success', 'Listing updated successfully!')
  res.redirect(`/listings/${id}`)
}

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params
  await Listing.findByIdAndDelete(id)
  req.flash('success', 'Listing deleted successfully!')
  res.redirect('/listings')
}
