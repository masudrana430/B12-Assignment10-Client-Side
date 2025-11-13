Readme.md:
 

This project provides a full-stack MERN (MongoDB, Express.js, React.js, Node.js) hands-on development experience, allowing users to report and track environmental/cleanliness-related issues in their local area — such as garbage buildup, broken footpaths, illegal dumping, waterlogging, and more. Users can also request cleanup drives, pay small fees for community services (if applicable), and view their issue history.
This project emphasizes clean UI using Tailwind CSS, secured routes with Firebase Authentication, and a modern, professional app structure using private routes, protected data, and user authorization.


Live Demo: https://b12-a10-masud.netlify.app/

✨ Key Features
Firebase Authentication

Email/Password sign up & login

Google Sign-In

Update profile (name & avatar) with updateProfile()

Forgot Password flow

Protected Routes


Redirects unauthenticated users to Login, then back to their intended page after login

Responsive UI with Tailwind CSS + daisyUI

Modern, accessible components and utility-first styling

Hero Swiper

## Key Features

- ✅ **Report Issues Easily** – Users can submit new clean-up issues with title, description, category, location, image and estimated cost.
- 🧹 **Browse All Issues** – Visitors can explore all reported issues and see details such as status, required amount, and raised amount.
- 👤 **My Issues Dashboard** – Logged-in users can manage the issues they created, update information, and track their progress.
- 💚 **Contribution System** – Users can donate to support specific issues and see their **My Contribution** page with detailed history.
- 🧾 **PDF Receipts & Reports** – Users can download individual contribution receipts and a full PDF report of all their contributions.
- 🔐 **Secure Authentication** – Firebase authentication (email/password, etc.) is used to protect user-specific pages and actions.
- 🌓 **Dark / Light Theme Toggle** – Built-in theme switcher for a better viewing experience in different environments.
- 📱 **Responsive UI** – Fully responsive design so the site works smoothly on mobile, tablet, and desktop.

---

## Tech Stack

- **Frontend:** React, Vite, React Router
- **Styling:** Tailwind CSS, DaisyUI, Lottie animations ,React-simple-typewriter
React Awesome reveal 

- **Auth:** Firebase Authentication
- **Backend API:** Node.js, Express, MongoDB (separate server)
- **PDF Generation:** jsPDF, jsPDF-autotable

---

Micro-interactions & Animations

Framer Motion for staggered reveals, hover/tap, toasts, etc.

AOS for simple scroll-in effects (used where Motion isn’t)

Toasts & Alerts

daisyUI toasts

SweetAlert2 for uninstall confirmations

🛠️ Tech Stack
React + React Router

Firebase Auth

Tailwind CSS + daisyUI

Swiper

Framer Motion

AOS (Animate On Scroll)

SweetAlert2

(Optional) Animate.css if you enable it globally