# 💎 ClubHub 

### ClubHub – Membership & Event Management Platform

ClubHub is a MERN stack web application for discovering, joining, and managing local clubs and events.
It supports Admin, Club Manager, and Member roles with secure authentication and Stripe payments.

### Demo Link: https://club-hub-rho.vercel.app/

---


### 🌟 Key Features
* 📊 Data Visualization: Interactive PieCharts (via Recharts) displaying real-time membership distribution across various clubs.

* 💳 Secure Payments: Fully integrated Stripe payment gateway for membership fees and event tickets.

* 🔐 Advanced Authentication: Dual-layer security using Firebase Authentication for users and JWT (JSON Web Tokens) for protected server-side APIs.

* 🛡️ Admin Control Center: A specialized dashboard for admins to manage clubs, verify members, and monitor growth analytics.

* 🌓 Adaptive UI: Sleek Dark/Light mode switching powered by React Context API and Tailwind CSS.

* ⚡ High Performance: Optimized frontend using TanStack Query (React Query) for efficient data fetching and caching.

---

### 🛠️ Technical Architecture
#### Frontend
* Library: React.js (Vite)

* Styling: Tailwind CSS, DaisyUI

* State Management: Context API & TanStack Query

* Visualization: Recharts (Dynamic Analytics)

* Animations: Framer Motion, GSAP

#### Backend
* Server: Node.js, Express.js

* Database: MongoDB (Utilizing Aggregation Pipelines)

* Security: Firebase Admin SDK, JWT Verification

* Payment: Stripe API

---

### 📈 Technical Deep Dive: Data Aggregation
One of the core highlights of this project is the Backend Aggregation Logic used for the Membership Chart. Instead of basic queries, I implemented a robust pipeline:

1. $addFields: Converts string IDs to ObjectIds for relational mapping.

2. $group: Calculates the total member count per club.

3. $lookup: Performs a join with the clubs collection to retrieve descriptive data.

4. $project: Formats the final JSON output for seamless frontend rendering.
  
  ---
  
### 🚀 Installation & Local Setup
1. Clone the Repository:

Bash
[git clone https://github.com/your-username/club-hub.git](https://github.com/Abdur-Razzaqe/club-hub-client)
 cd club-hub
2. Install Dependencies:

#### Bash
# Client Side
cd client && npm install
# Server Side
cd server && npm install
3. Configure Environment Variables (.env):
Create a .env file in your server directory:

Code snippet
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
ACCESS_TOKEN_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret

4. Run Development Servers:

Bash
# Start Backend (Port 3000)
npm start
### Start Frontend (Port 5173)
npm run dev
--- 
### 👨‍💻 Developed By
Abdur Razzaqe Mia MERN Stack Developer GitHub Profile | LinkedIn

