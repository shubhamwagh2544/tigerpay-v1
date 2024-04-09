# TigerPay

TigerPay is a web application designed to simplify financial management tasks such as account creation, profile management, and transaction handling. It provides users with a user-friendly interface to manage their financial activities securely.

## Features

- **Account Creation:** Users can create new accounts with customizable names, account types, and currencies.
- **Profile Management:** Users can update their profile information, including their name, email, and other details.
- **Transaction Handling:** Users can view their transaction history and perform financial transactions securely.
- **Information Pages:** TigerPay provides informative pages such as About and Contact Me for users to learn more about the application and contact support if needed.

## Installation

1. Clone the repository:
```
git clone <repository-url>
```
2. Install Dependencies:
```
cd client && npm install
cd server && npm install
```
3. Set up ENV variables
4. Start application:
```
cd client && npm run dev
cd server && npm run dev
```

## Usage
- Open your browser and navigate to http://localhost:3000 to view the application.
- Sign in to your account or create a new account if you don't have one.
- Explore the various features of the application:
    - Create new accounts with custom names, account types, and currencies.
    - Update your profile information.
    - View your transaction history and perform financial transactions securely.

## Tech Stack
TigerPay is built using the following technologies:

- Frontend: React.js, React Router, Tailwind CSS, shadcn-ui Components
- Backend: Node.js, Express.js, MongoDB
- Authentication: JWT (JSON Web Tokens)
- Payment Gateway Integration: Razorpay

## Deployment
A live demo of application is available at [TigerPay](https://tigerpay-v1-client.onrender.com/).
