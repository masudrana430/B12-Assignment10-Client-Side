Readme.md:
 

WarmPaws – Pet Care in Winter
A cozy winter companion platform designed for pet owners to keep their furry friends warm, safe, and healthy during the cold season. Discover local services, winter clothing, grooming options, expert tips, and more — all in one friendly interface.

Live Demo: https://a09-category-rose.netlify.app/

✨ Key Features
Firebase Authentication

Email/Password sign up & login

Google Sign-In

Update profile (name & avatar) with updateProfile()

Forgot Password flow

Protected Routes

Certain pages (e.g. Service details, Installation/My Products) require login

Redirects unauthenticated users to Login, then back to their intended page after login

Responsive UI with Tailwind CSS + daisyUI

Modern, accessible components and utility-first styling

Hero Swiper

Winter-themed hero slider using Swiper (autoplay, fade, pagination, navigation)

Dynamic Services

Services rendered from /public/appData.json (sample JSON included)

Search with debounce, loading skeletons, and graceful empty states

Book Service Form

Client-only booking form (name, email) with validation & toast confirmations

Stores lightweight bookings in localStorage (no backend required)

Installation / My Products

Local “purchases” list (from localStorage)

Sort by perceived value (downloads), uninstall with confirmation

Expert Vets Section

Static cards for 3–4 vets with ratings, specialties, and actions

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