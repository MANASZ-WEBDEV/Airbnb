<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=32&duration=2800&pause=2000&color=FF385C&center=true&vCenter=true&width=940&lines=Wanderlust+%F0%9F%8C%8D;Full-Stack+Airbnb+Clone;Node.js+%7C+Express+%7C+MongoDB" alt="Typing SVG" />
</div>

<div align="center">

  [![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-wanderlust.whymanas.tech-FF385C?style=for-the-badge)](https://wanderlust.whymanas.tech)
  [![GitHub Repo](https://img.shields.io/badge/📦_Source_Code-181717?style=for-the-badge&logo=github)](https://github.com/MANASZ-WEBDEV/Airbnb)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 🚀 Overview

**Wanderlust** is a production-ready, full-stack web application inspired by Airbnb. Built from scratch with Node.js, Express, and MongoDB, it features secure authentication, cloud image storage, interactive maps, and a clean MVC architecture — deployed live at a custom domain.

---

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ Secure registration and login with **Passport.js** + `passport-local-mongoose`
- ✅ Password hashing with **bcrypt**
- ✅ Session management with **express-session** + **connect-mongo** (persistent sessions)
- ✅ Flash messages via **connect-flash**
- ✅ Route protection — only authenticated users can create/edit/delete
- ✅ Ownership checks — users can only modify their own listings and reviews

### 📋 Listings & Reviews
- ✅ Full **CRUD** for property listings and reviews
- ✅ Average rating calculation and display
- ✅ Server-side validation with **Joi** schema validation
- ✅ Custom error messages for invalid inputs

### ☁️ Cloud Integration
- ✅ **Cloudinary** for image storage and CDN delivery
- ✅ File uploads via **Multer** + `multer-storage-cloudinary`

### 🗺️ Interactive Maps
- ✅ **Mapbox SDK** for geocoding (address → coordinates)
- ✅ Interactive map with property pins and popups on every listing page

### 🛡️ Security
- ✅ Environment variables with **dotenv** (no secrets in code)
- ✅ Secure session cookies (`httpOnly`, expiration)
- ✅ Input sanitization to prevent XSS
- ✅ MongoDB Atlas IP whitelisting

### 🏗️ Architecture
- ✅ **MVC pattern** — models, views, controllers, routes, middleware clearly separated
- ✅ Custom `ExpressError` class for standardized error responses
- ✅ `wrapAsync` utility to eliminate repetitive try/catch blocks
- ✅ Modular layouts with **EJS-Mate**

### ☁️ Deployment
- ✅ Live on **Render** with custom domain `wanderlust.whymanas.tech`
- ✅ **UptimeRobot** pings every 5 minutes — no cold start delays for users

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Frontend** | EJS, EJS-Mate, CSS3, JavaScript |
| **Authentication** | Passport.js, passport-local-mongoose, bcrypt |
| **Cloud Storage** | Cloudinary, Multer |
| **Maps** | Mapbox SDK, Mapbox Geocoding API |
| **Validation** | Joi |
| **Session/Cookies** | express-session, connect-mongo, connect-flash |
| **Utilities** | dotenv, method-override, multer |
| **Monitoring** | UptimeRobot |

---

## ⚡ Getting Started

### Prerequisites
- **Node.js** v14 or higher
- **MongoDB Atlas** account (free tier works)
- **Cloudinary** account (free tier works)
- **Mapbox** API key (free tier works)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/MANASZ-WEBDEV/Airbnb.git
cd Airbnb
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root directory:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
MAPBOX_TOKEN=your_mapbox_token
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
```

**4. Start the development server**
```bash
npm start

# or with nodemon for auto-restart on file changes
nodemon App.js
```

**5. Visit the app**

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📂 Project Structure

```
wanderlust/
├── 📁 controllers/          # Route handler logic
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── 📁 models/               # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── 📁 routes/               # Express route definitions
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── 📁 views/                # EJS templates
│   ├── 📁 includes/         # navbar, footer, flash
│   ├── 📁 layouts/          # boilerplate layout
│   ├── 📁 listings/         # index, show, new, edit
│   └── 📁 users/            # login, signup
├── 📁 public/               # Static assets (CSS, JS)
├── 📁 utils/                # Error handling utilities
│   ├── ExpressError.js
│   └── wrapAsync.js
├── 📁 init/                 # DB seed scripts
├── 📄 App.js                # Entry point
├── 📄 middleware.js
├── 📄 schema.js
├── 📄 cloudConfig.js
└── 📄 package.json
```

---

## 🔑 Key Code Patterns

**Async Error Wrapper**
```javascript
const wrapAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
```

**Custom Error Class**
```javascript
class ExpressError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
```

**Joi Validation Middleware**
```javascript
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) throw new ExpressError(400, error.details.map(e => e.message).join(", "));
  next();
};
```

---

## 🎯 What I Learned

- 🔐 Building auth from scratch — Passport.js, sessions, cookies, flash messages
- 🗺️ Integrating third-party APIs end-to-end (Mapbox geocoding + Cloudinary uploads)
- ⚡ Writing reusable async wrappers and custom error classes
- 🏗️ Structuring a scalable codebase using MVC architecture
- ☁️ Deploying full-stack apps with uptime monitoring and secure env config
- 🔒 Security-first thinking: hashing, input sanitization, httpOnly cookies

---

## 🔮 Future Enhancements

- [ ] Add **Helmet.js** for HTTP security headers
- [ ] Migrate to **TypeScript** for type safety
- [ ] Add **unit & integration tests** (Jest + Supertest)
- [ ] Containerize with **Docker**
- [ ] Build **React frontend** for SPA experience
- [ ] Add advanced **search filters** (price, location, category)
- [ ] Integrate **payment gateway** (Razorpay)
- [ ] Add **real-time notifications** with Socket.io

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

## 👤 Author

**Manas Rajani**
- 🎓 3rd Year B.Tech CSE Student
- 💼 [LinkedIn](https://linkedin.com/in/manas-rajani)
- 📧 manasrajanidy89@gmail.com
- 🌐 [wanderlust.whymanas.tech](https://wanderlust.whymanas.tech)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

[![GitHub stars](https://img.shields.io/github/stars/MANASZ-WEBDEV/Airbnb?style=social)](https://github.com/MANASZ-WEBDEV/Airbnb)
[![GitHub forks](https://img.shields.io/github/forks/MANASZ-WEBDEV/Airbnb?style=social)](https://github.com/MANASZ-WEBDEV/Airbnb/fork)

**Made with ❤️ and ☕ by Manas Rajani**

</div>
