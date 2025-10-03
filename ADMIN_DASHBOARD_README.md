# Admin Dashboard Integration

This document describes the admin dashboard integration for the HyperMarket e-commerce application.

## Features

### 1. Admin Authentication & Authorization
- **AdminProtectedRoute**: Protects admin routes and ensures only users with admin role can access
- **Role-based access**: Users with `role: 'admin'` can access the admin dashboard
- **Automatic redirects**: Non-admin users are redirected to the home page

### 2. Admin Dashboard Components

#### Main Dashboard (`/admin`)
- **Stats Overview**: Displays total products, orders, revenue, and users
- **Recent Orders**: Shows the latest 5 orders with customer details
- **Real-time data**: Fetches data from backend API

#### Products Management (`/admin/products`)
- **View all products**: Displays products with name, price, stock, category
- **Add new products**: Modal form for creating new products
- **Edit products**: Update existing product information
- **Delete products**: Remove products from the system
- **Stock management**: Visual indicators for in-stock/out-of-stock status

#### Orders Management (`/admin/orders`)
- **View all orders**: Complete order list with customer information
- **Status management**: Update order status (pending, shipped, completed, cancelled)
- **Order filtering**: Filter orders by status
- **Order details**: Customer name, email, amount, items count

### 3. Navigation & UI
- **Responsive sidebar**: Collapsible navigation for mobile and desktop
- **Admin header**: Shows admin user info and logout option
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Mobile-friendly**: Responsive design for all screen sizes

## Backend API Endpoints

### Admin Routes (`/api/admin/`)
- `GET /stats` - Get dashboard statistics
- `GET /users` - Get all users (admin only)
- `GET /orders` - Get all orders (admin only)
- `PUT /orders/:id/status` - Update order status
- `GET /products` - Get all products (admin only)
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## How to Use

### 1. Access Admin Dashboard
1. Login with an admin account (user with `role: 'admin'`)
2. Click on "Account" dropdown in the navbar
3. Select "Admin Dashboard" from the dropdown menu
4. Or navigate directly to `/admin`

### 2. Managing Products
1. Go to `/admin/products`
2. Click "Add New Product" to create a new product
3. Use "Edit" button to modify existing products
4. Use "Delete" button to remove products
5. Stock status is automatically calculated based on inventory

### 3. Managing Orders
1. Go to `/admin/orders`
2. Use the status filter to view specific order types
3. Use the status dropdown to update order status
4. View customer details and order information

### 4. Viewing Statistics
1. Go to `/admin` (main dashboard)
2. View real-time statistics for:
   - Total products in inventory
   - Total orders placed
   - Total revenue generated
   - Total registered users

## Security Features

- **JWT Authentication**: All admin routes require valid JWT token
- **Role Verification**: Backend middleware checks for admin role
- **Protected Routes**: Frontend prevents unauthorized access
- **API Security**: All admin API endpoints are protected

## File Structure

```
frontend/src/
├── utils/
│   └── AdminProtectedRoute.jsx
├── components/admin/
│   ├── AdminSidebar.jsx
│   ├── AdminHeader.jsx
│   └── StatsCard.jsx
├── pages/admin/
│   ├── AdminDashboard.jsx
│   ├── AdminProducts.jsx
│   └── AdminOrders.jsx
├── api/
│   └── adminApi.js
└── pages/
    └── Admin.jsx

backend/routes/
└── admin.js
```

## Dependencies

### Frontend
- React Router for navigation
- Tailwind CSS for styling
- Context API for state management

### Backend
- Express.js for API routes
- JWT for authentication
- Mongoose for database operations

## Setup Instructions

1. Ensure the backend server is running on port 3000
2. Ensure the frontend development server is running on port 5173
3. Create a user with admin role in the database:
   ```javascript
   // In MongoDB or through registration
   {
     "role": "admin",
     "email": "admin@example.com",
     "name": "Admin User",
     // ... other user fields
   }
   ```
4. Login with the admin account
5. Access the admin dashboard through the navbar

## Future Enhancements

- User management interface
- Category and brand management
- Advanced analytics and reporting
- Inventory management
- Order tracking and shipping
- Email notifications
- Bulk operations for products and orders


