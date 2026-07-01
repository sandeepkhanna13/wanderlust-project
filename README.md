# 🌍 Wanderlust — Airbnb-Inspired Travel Listings Platform

Wanderlust is a full-stack web application inspired by Airbnb, where users can explore, create, and manage travel property listings. It features user authentication, image uploads, interactive maps, reviews, bookings, and an admin dashboard.

---

## 🚀 Live Demo

> https://wanderlust-project-am4l.onrender.com

---

## ✨ Features

- 🏠 **Browse Listings** — Explore properties filtered by category (Mountains, Beach, Farms, Camping, etc.)
- 🔍 **Search by Country** — Filter listings by country name
- 📝 **Create & Manage Listings** — Authenticated users can add, edit, and delete their own listings
- 🗺️ **Interactive Map** — Each listing displays its location on a MapTiler/MapLibre GL map with a marker and popup
- 📸 **Image Uploads** — Images are uploaded and stored via Cloudinary
- ⭐ **Reviews & Ratings** — Users can leave star ratings and comments on listings
- 🔐 **User Authentication** — Secure signup/login/logout using Passport.js (Local Strategy)
- 📅 **Booking System** — Users can book listings and receive a booking confirmation
- 🛡️ **Admin Dashboard** — Admins can manage users, listings, and view analytics charts
- 💰 **Tax Toggle** — Toggle to show/hide tax on listing prices
- 📄 **Privacy & Terms Pages** — Static legal pages included

---

## 🛠️ Tech Stack

### Frontend

| Technology     | Usage                     |
| -------------- | ------------------------- |
| EJS            | Templating engine         |
| Bootstrap 5    | Responsive UI components  |
| CSS3           | Custom styling            |
| MapLibre GL JS | Interactive map rendering |
| MapTiler API   | Map tiles and geocoding   |
| Chart.js       | Admin dashboard charts    |
| Font Awesome 7 | Icons                     |

### Backend

| Technology      | Usage                           |
| --------------- | ------------------------------- |
| Node.js         | Runtime environment             |
| Express.js      | Web framework                   |
| MongoDB Atlas   | Cloud database                  |
| Mongoose        | ODM for MongoDB                 |
| Passport.js     | Authentication middleware       |
| Cloudinary      | Image storage & CDN             |
| Multer          | File upload handling            |
| Express Session | Session management              |
| Connect-Mongo   | MongoDB session store           |
| Connect-Flash   | Flash messages                  |
| Method-Override | PUT/DELETE support in forms     |
| EJS-Mate        | Layout support for EJS          |
| Dotenv          | Environment variable management |

---

## 📁 Project Structure

```
wanderlust-project/
├── controllers/
│   ├── listings.js       # Listing CRUD + geocoding logic
│   ├── reviews.js        # Review create/delete
│   ├── users.js          # Signup/login/logout
│   ├── booking.js        # Booking logic
│   └── admin.js          # Admin dashboard logic
├── models/
│   ├── listing.js        # Listing schema
│   ├── review.js         # Review schema
│   ├── user.js           # User schema
│   └── booking.js        # Booking schema
├── routes/
│   ├── listings.js       # Listing routes
│   ├── reviews.js        # Review routes
│   ├── user.js           # Auth routes
│   ├── booking.js        # Booking routes
│   └── admin.js          # Admin routes
├── views/
│   ├── layouts/          # Boilerplate layout
│   ├── includes/         # Navbar, footer, flash
│   ├── listings/         # index, show, new, edit, error EJS
│   ├── users/            # signup, login EJS
│   ├── bookings/         # booking form & confirmation
│   ├── admin/            # admin dashboard EJS
│   └── static/           # privacy, terms pages
├── public/
│   ├── css/style.css     # Custom styles
│   ├── js/map.js         # MapLibre map rendering
│   └── js/script.js      # Bootstrap validation
├── init/
│   ├── data.js           # Sample seed data
│   └── index.js          # DB seeding script
├── middleware.js          # Custom middleware
├── utils/
│   ├── ExpressError.js   # Custom error class
│   └── wrapAsync.js      # Async error wrapper
├── app.js                # Main Express app
├── .env                  # Environment variables (not committed)
├── .gitignore
└── package.json
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- MapTiler account

### 1️⃣ Clone the repository

```bash
git clone https://github.com/sandeepkhanna13/wanderlust-project.git
cd wanderlust-project
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file in root directory

```env
ATLASDB_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/wanderlust
SECRET=your_session_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAPTILER_TOKEN=your_maptiler_api_key
```

### 4️⃣ Seed the database (optional)

```bash
node init/index.js
```

### 5️⃣ Start the development server

```bash
npm run dev
```

### 6️⃣ Open in browser

```
http://localhost:8080/listings
```

---

## 🗺️ Map Setup

This project uses **MapTiler** (free, no credit card required) instead of Mapbox:

1. Sign up at [cloud.maptiler.com](https://cloud.maptiler.com)
2. Go to **API Keys** and copy your key
3. Add it to `.env` as `MAPTILER_TOKEN`

Geocoding is handled server-side using the MapTiler Geocoding API. Map rendering uses **MapLibre GL JS** (open-source).

---

## 🔐 Environment Variables

| Variable           | Description                           |
| ------------------ | ------------------------------------- |
| `ATLASDB_URL`      | MongoDB Atlas connection string       |
| `SECRET`           | Session secret key                    |
| `CLOUD_NAME`       | Cloudinary cloud name                 |
| `CLOUD_API_KEY`    | Cloudinary API key                    |
| `CLOUD_API_SECRET` | Cloudinary API secret                 |
| `MAPTILER_TOKEN`   | MapTiler API key for maps & geocoding |

---

## 📦 Key NPM Packages

```json
{
  "express": "^4.x",
  "mongoose": "^8.x",
  "passport": "^0.7.x",
  "passport-local": "^1.x",
  "passport-local-mongoose": "^8.x",
  "cloudinary": "^2.x",
  "multer": "^1.x",
  "multer-storage-cloudinary": "^4.x",
  "connect-mongo": "^5.x",
  "connect-flash": "^0.1.x",
  "express-session": "^1.x",
  "method-override": "^3.x",
  "ejs": "^3.x",
  "ejs-mate": "^4.x",
  "dotenv": "^17.x",
  "nodemon": "^3.x"
}
```

---

## 👤 Author

**Sandeep Khanna**

- GitHub: [@sandeepkhanna13](https://github.com/sandeepkhanna13)
- LinkedIn: [sandeep-khanna13](https://linkedin.com/in/sandeep-khanna13)
- Email: khannasandeep24@gmail.com
