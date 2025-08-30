HisabKitab – Invoice Management App

This is my full-stack Invoice/Billing Management App built with Next.js and MongoDB. I made this project to manage invoices, customers, and payments in a simple way.

 What it can do

Create, edit, and delete invoices

Manage customers and their details

Mark invoices as paid or unpaid

Dashboard with stats (total invoices, revenue, pending payments, etc.)

Export invoices as PDF

User authentication (login & signup)

Tech Stack

Frontend: Next.js (React + Tailwind CSS)

Backend: Next.js API Routes

Database: MongoDB with Mongoose

Authentication: NextAuth.js (or JWT if you used custom)

 How to run locally

Clone the repo

git clone https://github.com/manojshrestha003/invoice-app
cd invoice-app


Install dependencies

npm install


Create a .env.local file and add:

MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000


Run the development server

npm run dev


Open http://localhost:3000
 in your browser 🚀

📂 Project Structure
components/      -> Reusable UI components
models/          -> Database models (Mongoose)
pages/           -> Next.js pages (with API routes)
public/          -> Static assets
utils/           -> Helper functions
styles/          -> Global styles



 Future Improvements

Add email notifications for invoices

Multi-currency support

Payment gateway integration (Stripe/PayPal)

Admin dashboard with more analytics

