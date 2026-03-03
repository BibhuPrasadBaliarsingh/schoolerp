# School ERP Backend

Node.js + Express + MongoDB backend for School ERP System.

## Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file (already provided):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/schoolerp
NODE_ENV=development
JWT_SECRET=your_ultra_secure_jwt_secret_key_change_this_in_production_2026
```

3. Start MongoDB locally:
```bash
mongod
```

4. Start the server:
```bash
npm run dev    # Development (with nodemon)
npm start      # Production
```

Server will run on `http://localhost:5000`

## API Routes

### Authentication 🔐
- `POST /api/auth/register` - Register new user (returns JWT token)
- `POST /api/auth/login` - Login user (returns JWT token)
- `GET /api/auth/me` - Get current user (Protected)

**Authentication Required**: Most routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

**User Roles**:
- `admin` - Full access to all routes
- `teacher` - Can manage assignments, view students
- `student` - Limited access, view only

### Users (Protected)
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Protected)
- `PATCH /api/users/:id` - Update user (Protected)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Fees (Protected)
- `GET /api/fees` - Get all fees (Protected)
- `POST /api/fees` - Create fee (Admin only)
- `PATCH /api/fees/:id` - Update fee (Admin only)
- `DELETE /api/fees/:id` - Delete fee (Admin only)

### Income/Expense (Admin Only)
- `GET /api/income-expense` - Get records (Admin only)
- `POST /api/income-expense` - Create record (Admin only)
- `PATCH /api/income-expense/:id` - Update record (Admin only)
- `DELETE /api/income-expense/:id` - Delete record (Admin only)

### Staff (Protected)
- `GET /api/staff` - Get all staff (Protected)
- `POST /api/staff` - Create staff (Admin only)
- `PATCH /api/staff/:id` - Update staff (Admin only)
- `DELETE /api/staff/:id` - Delete staff (Admin only)

### Assignments (Protected)
- `GET /api/assignments` - Get assignments (Protected)
- `POST /api/assignments` - Create assignment (Teacher/Admin only)
- `PATCH /api/assignments/:id` - Update assignment (Teacher/Admin only)
- `DELETE /api/assignments/:id` - Delete assignment (Teacher/Admin only)

### Buses (Protected)
- `GET /api/buses` - Get all buses (Protected)
- `POST /api/buses` - Create bus (Admin only)
- `PATCH /api/buses/:id` - Update bus location (Admin only)
- `DELETE /api/buses/:id` - Delete bus (Admin only)

## Security Features

- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ JWT-based authentication (7-day expiry)
- ✅ Role-based access control (RBAC)
- ✅ Protected routes with middleware
- ✅ Token verification on every request

## Quick Start Guide

1. **Register an admin user**:
```bash
POST /api/auth/register
{
  "email": "admin@school.com",
  "password": "admin123",
  "username": "admin",
  "role": "admin"
}
```

2. **Login to get token**:
```bash
POST /api/auth/login
{
  "email": "admin@school.com",
  "password": "admin123"
}
```

3. **Use the token** in subsequent requests:
```bash
GET /api/users
Authorization: Bearer <your-token-here>
```

## Notes
- All routes use RESTful conventions
- MongoDB ObjectIds are used for references
- Update endpoints preserve omitted fields (use patch)
