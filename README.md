# **Secure-Test**

## **Overview**

Secure-Test is a full-stack web application built using React (Vite) for the frontend and Node.js (Express) for the backend, with Prisma as the ORM and MySQL as the database.

## **Tech Stack**

## Frontend:

- Vite + React

- Tailwind CSS

## Backend:

- Node.js + Express

- Prisma ORM

- MySQL

## **Setup Instructions**

**1. Clone the Repository**

git clone https://github.com/your-repo/Secure-test-main.git
cd Secure-test-main

**2. Install Dependencies**

## Frontend:

cd client
npm install

## Backend:

cd ../server
npm install

**3. Configure Environment Variables**

## Frontend (client/.env):

VITE_API_URL=http://localhost:5000

## Backend (server/.env):

DATABASE_URL="mysql://user:password@localhost:3306/secure_test"
PORT=5000
JWT_SECRET=your_secret_key

Update DATABASE_URL with your actual MySQL credentials.

**4. Set Up the Database**

- Ensure you have MySQL installed and running.

- Import the existing database:

mysql -u root -p secure_test < backup.sql

- Run Prisma migrations:

cd server
npx prisma migrate dev

**5. Start the Application**

### Run the Backend:

cd server
npm start

### Run the Frontend:

cd client
npm run dev

**6. Access the Application
**
**Frontend:** http://localhost:5173

**Backend API: ** http://localhost:5000


