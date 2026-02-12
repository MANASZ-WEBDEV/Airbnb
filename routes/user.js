const express = require('express')
const router = express.Router() // mergeParams to access :id from parent route
const wrapAsync = require('../utils/wrapAsync.js')
const passport = require('passport')
const User = require('../models/user.js')
const { savedRedirectUrl } = require('../middleware.js')

router.get('/signup', (req, res) => {
  res.render('users/signup.ejs')
})

router.post(
  '/signup',
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body
      const newUser = new User({ username, email })
      const registeredUser = await User.register(newUser, password)
      req.login(registeredUser, err => {
        if (err) {
          return next(err)
        }
        req.flash('success', 'Welcome to Wanderlust!')
        let redirectUrl = res.locals.redirectUrl || '/listings';
        res.redirect(redirectUrl)
      })
    } catch (e) {
      req.flash('error', e.message)
      res.redirect('/signup')
    }
  })
)

router.get('/login', (req, res) => {
  res.render('users/login.ejs')
});

router.post(
  '/login',
  savedRedirectUrl,  // Runs BEFORE passport, saves URL to res.locals
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
  }),
  async (req, res) => {
    req.flash('success', 'Welcome back to Wanderlust!')
    // Use res.locals (survives session regeneration)
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl)
  }
)

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err)
    }
    req.flash('success', 'You have been logged out.')
    res.redirect('/listings')
  })
})

module.exports = router
