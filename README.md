# Airbnb Clone Project

## Overview
A full-stack web application inspired by Airbnb, built with Node.js, Express, MongoDB, and EJS. This project demonstrates a wide range of backend and frontend skills, including authentication, authorization, cloud integration, and interactive maps.

---

## Key Features & Skills Demonstrated

### 1. User Authentication & Authorization
- Secure user registration and login (with hashed passwords)
- Session management using `express-session` and cookies
- Persistent login state and flash messages
- Route protection: Only logged-in users can create, edit, or delete listings/reviews
- Ownership checks: Only owners can modify or delete their own listings/reviews

### 2. Listings & Reviews Management
- Full CRUD for property listings
- Add, edit, and delete reviews for listings
- Average rating calculation and display
- Input validation and error handling with Joi

### 3. Cloudinary Integration
- Image uploads for listings stored securely on Cloudinary
- Uses `multer` and `multer-storage-cloudinary` for file handling

### 4. Mapbox Integration
- Interactive maps showing listing locations
- Geocoding and map display using Mapbox SDK

### 5. Security Best Practices
- Password hashing with Passport.js and passport-local-mongoose
- Input validation and sanitization
- Secure session and cookie handling (httpOnly, expiration)
- Environment variables managed with dotenv

### 6. MVC Architecture & Code Organization
- Clear separation of concerns: models, views, controllers, routes, middleware
- Async/await and error-wrapping utilities for robust error handling

### 7. UI/UX
- Responsive EJS templates for all pages
- Flash messages for user feedback
- Modular layouts and partials (navbar, footer, etc.)

### 8. Additional Features
- Privacy and Terms pages
- Static assets (CSS/JS) for enhanced interactivity and design

---

## Technologies Used
- Node.js, Express.js
- MongoDB, Mongoose
- EJS, EJS-Mate
- Passport.js (authentication)
- Cloudinary (image storage)
- Mapbox (maps & geocoding)
- Joi (validation)
- connect-flash, express-session, connect-mongo
- dotenv, method-override, multer

---

## How to Run
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your `.env` file with MongoDB, Cloudinary, Mapbox, and session secrets
4. Start the server: `node App.js` or `nodemon App.js`
5. Visit `http://localhost:3000`

---

## Folder Structure
- `models/` - Mongoose schemas for users, listings, reviews
- `controllers/` - Route logic for listings, reviews, users
- `routes/` - Express route definitions
- `views/` - EJS templates
- `public/` - Static assets (CSS, JS)
- `utils/` - Error handling and async utilities
- `cloudConfig.js` - Cloudinary configuration

---

## Environment Variables Example
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
MAPBOX_TOKEN=your_mapbox_token
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
```

---

## Credits
Developed as a major project to demonstrate full-stack web development skills.