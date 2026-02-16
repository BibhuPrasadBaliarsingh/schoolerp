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

### Users
- `GET /api/users` - Get all users (supports query: role, email, password)
- `POST /api/users` - Create user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Fees
- `GET /api/fees` - Get all fees
- `POST /api/fees` - Create fee
- `PATCH /api/fees/:id` - Update fee
- `DELETE /api/fees/:id` - Delete fee

### Income/Expense
- `GET /api/income-expense` - Get records (supports query: type)
- `POST /api/income-expense` - Create record
- `PATCH /api/income-expense/:id` - Update record
- `DELETE /api/income-expense/:id` - Delete record

### Staff
- `GET /api/staff` - Get all staff
- `POST /api/staff` - Create staff
- `PATCH /api/staff/:id` - Update staff
- `DELETE /api/staff/:id` - Delete staff

### Assignments
- `GET /api/assignments` - Get assignments
- `POST /api/assignments` - Create assignment
- `PATCH /api/assignments/:id` - Update assignment
- `DELETE /api/assignments/:id` - Delete assignment

### Buses
- `GET /api/buses` - Get all buses
- `POST /api/buses` - Create bus
- `PATCH /api/buses/:id` - Update bus location
- `DELETE /api/buses/:id` - Delete bus

## Notes
- All routes use RESTful conventions
- MongoDB ObjectIds are used for references
- Update endpoints preserve omitted fields (use patch)
