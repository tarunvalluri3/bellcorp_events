# Bellcorp Event Management Application

This is a full stack Event Management web application built using the MERN stack. The main goal of this project is to create a platform where users can discover events, view details, register for events, and manage their registrations through a personal dashboard.

I built this project step by step with proper backend structure, authentication, protected APIs, and a clean frontend UI using React and Tailwind. It is designed like a small production-style app, not just a demo.

---

## Tech Stack Used

Frontend:
- React (Vite)
- React Router
- Axios
- Tailwind CSS

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

Authentication:
- JWT (JSON Web Token)
- bcryptjs for password hashing

Deployment:
- Backend hosted on Render
- Frontend hosted on Vercel

---

## Main Features

Authentication:
- User registration
- User login
- Password stored as hashed value
- JWT token based auth
- Protected routes on backend and frontend

Event Discovery:
- Browse all events
- View single event details
- Search events by name
- Filter by category
- Filter by location
- Backend supports query-based filtering and pagination-ready structure

Event Registration:
- Register for an event
- Cancel registration
- Duplicate registrations are blocked
- Event capacity is enforced
- Available seats calculated dynamically

Dashboard:
- Shows only logged-in user registrations
- Event details populated in dashboard
- Structure supports upcoming vs past separation

UI:
- Built with Tailwind CSS
- Clean and minimal layout
- Navbar + Home page
- Reusable layout wrapper
- Simple, readable components
- Not overdesigned, but neat and structured

---

## Folder Structure
root
│
├── server
│ ├── config
│ │ └── db.js
│ ├── controllers
│ │ ├── authController.js
│ │ ├── eventController.js
│ │ └── registrationController.js
│ ├── middleware
│ │ └── authMiddleware.js
│ ├── models
│ │ ├── User.js
│ │ ├── Event.js
│ │ └── Registration.js
│ ├── routes
│ │ ├── authRoutes.js
│ │ ├── eventRoutes.js
│ │ └── registrationRoutes.js
│ ├── utils
│ │ └── generateToken.js
│ ├── seedEvents.js
│ ├── server.js
│ └── .env
│
├── client
│ ├── src
│ │ ├── api
│ │ │ └── axios.js
│ │ ├── components
│ │ │ ├── Layout.jsx
│ │ │ ├── Navbar.jsx
│ │ │ ├── ProtectedRoute.jsx
│ │ │ └── EventCard.jsx
│ │ ├── context
│ │ │ └── AuthContext.jsx
│ │ ├── pages
│ │ │ ├── Home.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── Events.jsx
│ │ │ ├── EventDetails.jsx
│ │ │ └── Dashboard.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│
└── README.md 


---

## Database Models

User:
- name
- email (unique)
- password (hashed)

Event:
- name
- organizer
- location
- datetime
- description
- category
- capacity
- registeredCount

Registration:
- user reference
- event reference
- compound unique index to prevent duplicate registrations

---

## API Endpoints

Auth Routes:
- POST /api/auth/signup
- POST /api/auth/login

Event Routes:
- GET /api/events
- GET /api/events/:id
- Supports query params: search, category, location

Registration Routes:
- POST /api/registrations
- DELETE /api/registrations/:eventId
- GET /api/registrations/me

Registration routes are protected using JWT middleware.

---



This creates multiple events with different categories, locations, and dates so search and filters can be tested properly.

---

## Deployment Notes

Backend is deployed on Render as a Web Service.  
Frontend is deployed on Vercel using Vite build.

Frontend uses environment variable:



Backend CORS is configured to allow both local dev and deployed frontend domain.

---

## Main Flow

User creates account → logs in → token stored →  
User browses events → opens event details → registers →  
Registration saved in database → dashboard shows registered events →  
User can cancel registration → seat count updates.

---

## Extra Notes

- Passwords are never stored in plain text.
- Duplicate event registrations are blocked at both logic and DB level.
- Capacity check runs before every registration.
- Axios interceptor automatically attaches JWT token.
- Tailwind used with limited utility classes to keep UI clean and readable.

---

## Author

Tarun Valluri  
MERN Stack Event Management Project

