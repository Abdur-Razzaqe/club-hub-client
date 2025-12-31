ClubHub – Membership & Event Management Platform

ClubHub is a MERN stack web application for discovering, joining, and managing local clubs and events.
It supports Admin, Club Manager, and Member roles with secure authentication and Stripe payments.

Key Features:

Role-based dashboards (Admin / Manager / Member)
Club creation & admin approval system
Free & paid club memberships (Stripe)
Event creation & registration
Secure Firebase authentication & JWT protection
Responsive dashboard with modern UI

User Roles
Member: Join clubs, register for events, view payments
Club Manager: Manage clubs, members, and events
Admin: Approve clubs, manage users, monitor payments

Payments
Stripe (test mode)
Membership payments
Automatic membership creation after success

Database Collections
users,
clubs,
memberships,
events,
eventRegistrations,
payments,

Tech Stack

Frontend: React, React Router, React-Icon, Sweet Alert, framer-motion, TanStack Query, React Hook Form, Tailwind, DaisyUI
Backend: Node.js, Express, MongoDB, Firebase Admin, Stripe
Auth: Firebase Authentication

Security
Firebase token verification
Role-based route protection
Environment variables for all secrets


Live Links
Client: https://precious-tulumba-e550bb.netlify.app/
