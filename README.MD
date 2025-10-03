# HyperMarket - E-commerce Platform

## Overview

HyperMarket is a comprehensive e-commerce platform built with React for the frontend and Node.js with Express for the backend. It offers a wide range of features for both customers and administrators, including product browsing, shopping cart functionality, secure checkout, and an admin dashboard for managing products, orders, categories, and users.

## Features

### Core Features

- **Product Catalog**: Browse products by category, search, and sort options.
- **Shopping Cart**: Add, remove, and update items in a shopping cart.
- **Checkout Process**: Secure checkout with customer information, shipping address, and payment method selection.
- **User Authentication**: Secure signup and sign-in functionality with JWT-based authentication.
- **Admin Dashboard**: Role-based access control for administrators to manage the platform.

### Customer Features

- **User Accounts**: Manage profile information, orders, and addresses.
- **Order History**: View past orders and order details.
- **Secure Payments**: Integration with payment gateways for secure transactions.

### Admin Features

- **Dashboard Overview**: Key statistics including total products, orders, revenue, and users.
- **Product Management**: Add, edit, and delete products with detailed information.
- **Category Management**: Create, update, and delete product categories.
- **Order Management**: View, filter, and update order statuses.
- **User Management**: View and manage user accounts.
- **Stock Management**: Manage product stock levels.

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **React Router**: For navigation and routing within the application.
- **Redux Toolkit**: For state management.
- **Redux Persist**: To persist the redux store in local storage.
- **Tailwind CSS**: For styling and UI components.
- **Lucide React**: For icons.
- **Axios**: For making HTTP requests to the backend API.

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express**: Web application framework for Node.js.
- **Mongoose**: MongoDB object modeling tool.
- **JSON Web Tokens (JWT)**: For user authentication and authorization.
- **Bcrypt**: For password hashing.
- **Nodemailer**: For sending emails.
- **Cors**: For enabling Cross-Origin Resource Sharing.
- **Dotenv**: For managing environment variables.

### Database

- **MongoDB**: NoSQL database for storing application data.

## Setup Instructions

### Prerequisites

- Node.js (>=18)
- npm (>=8) or yarn
- MongoDB

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd hyper-market
    ```

2.  **Backend Setup:**

    ```bash
    cd backend
    npm install
    ```

    - Create a `.env` file in the `backend` directory and add the following environment variables:

      ```
      MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
      EMAIL_USER=<your-email-address>
      EMAIL_PASS=<your-email-app-password>
      JWT_SECRET=<your-jwt-secret-key>
      JWT_EXPIRES_IN=1h
      PORT=3000
      ```

    - Start the backend server:

      ```bash
      node server.js
      ```

3.  **Frontend Setup:**

    ```bash
    cd ../frontend
    npm install
    ```

    - Start the frontend development server:

      ```bash
      npm run dev
      ```

### Configuration

- **Frontend**:
  - The frontend application runs on `http://localhost:5173` by default.
  - API base URL is set to `http://localhost:3000/api`.
- **Backend**:
  - The backend server runs on `http://localhost:3000` by default.
  - Ensure that the MongoDB URI is correctly configured in the `.env` file.

### Admin Account

- Create a user with the role `admin` in the database to access the admin dashboard. Example:

  ```javascript
  // In MongoDB or through registration
  {
    "role": "admin",
    "email": "admin@example.com",
    "name": "Admin User",
    // ... other user fields
  }
  ```

- Log in with the admin account and navigate to `/admin` to access the admin dashboard.

## API Endpoints

### Auth (`/api/auth`)

- `POST /signup`: Register a new user.
- `POST /signin`: Authenticate user and return JWT.
- `GET /profile`: Get user profile (requires JWT).

### Products (`/api/product`)

- `GET /`: Get all products.

### Categories (`/api/category`)

- `GET /`: Get all categories.

### Orders (`/api/orders`)

- `POST /`: Create a new order (requires JWT).
- `GET /`: Get user orders (requires JWT).  

### Admin (`/api/admin`)

- `GET /stats`: Get dashboard statistics (requires JWT and admin role).
- `GET /users`: Get all users (requires JWT and admin role).
- `GET /orders`: Get all orders (requires JWT and admin role).
- `PUT /orders/:id/status`: Update order status (requires JWT and admin role).
- `GET /products`: Get all products (requires JWT and admin role).
- `POST /products`: Create new product (requires JWT and admin role).
- `PUT /products/:id`: Update product (requires JWT and admin role).
- `DELETE /products/:id`: Delete product (requires JWT and admin role).

## File Structure

hyper-market/
├── backend/
│   ├── .env                           # Environment variables
│   ├── package.json                     # Backend dependencies and scripts
│   ├── server.js                        # Main server file
│   ├── config/
│   │   └── db.js                        # Database connection
│   ├── middleware/
│   │   ├── auth.js                      # Authentication middleware
│   │   └── authorize.js                 # Authorization middleware
│   ├── models/
│   │   ├── users.js                     # User model
│   │   ├── product.js                   # Product model
│   │   ├── category.js                  # Category model
│   │   └── order.js                     # Order model
│   ├── routes/
│   │   ├── register.js                  # Authentication routes
│   │   ├── product.js                   # Product routes
│   │   ├── category.js                  # Category routes
│   │   ├── order.js                     # Order routes
│   │   └── admin.js                     # Admin routes
│   └── utils/
│       ├── jwt.js                       # JWT utility functions
│       └── sendEmail.js                 # Email sending utility
├── frontend/
│   ├── package.json                     # Frontend dependencies and scripts
│   ├── public/                          # Static assets
│   ├── src/
│   │   ├── App.jsx                      # Main application component
│   │   ├── components/                  # Reusable React components
│   │   ├── pages/                       # React page components
│   │   ├── utils/                       # Utility functions and context
│   │   ├── api/                         # API request functions
│   │   └── redux/                       # Redux store configuration
│   └── index.html                       # Main HTML file
└── README.md                            # Project documentation

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

[MIT](LICENSE)

## Contact

[Vijay Kushwaha] - [kushwaha638750@gmail.com]

