# School ERP Backend - API Documentation

## Overview
Complete backend API for School ERP Management System with all required features.

---

## 🎯 Features Implemented

### ✅ Core Features (As per requirements)
1. **Income/Expense Management** ✓
2. **Fees Collection** ✓
3. **Student Management** ✓
4. **Staff Management** ✓
5. **Home Work and Daily Assignment** ✓
6. **School Bus Live Location Tracking** ✓
7. **ID Card Generation** ✓
8. **Admit Card Generation** ✓
9. **Marksheet/Report Card** ✓
10. **Notifications** ✓
11. **Chat/Messaging** ✓
12. **Attendance Tracking** ✓
13. **Class Management** ✓
14. **Subject Management** ✓
15. **Exam Management** ✓

---

## 📁 Models

### 1. User Model
- Enhanced with teacher, parent, and student roles
- Notification preferences
- Teacher and parent specific information

### 2. Student Model
- Complete student information (personal, academic, medical)
- Parent/Guardian details
- Emergency contacts
- Transport information
- Document management

### 3. Class Model
- Class name, section, academic year
- Class teacher assignment
- Subjects and students
- Timetable management

### 4. Subject Model
- Subject details with code
- Teacher assignment
- Marks configuration

### 5. Exam Model
- Exam scheduling
- Subject-wise exams
- Result publication

### 6. Marks Model
- Student marks with auto-grade calculation
- Verification system
- Marksheet generation

### 7. Attendance Model
- Daily attendance tracking
- Leave management
- Subject-wise attendance
- Statistics calculation

### 8. Notification Model
- Multi-channel notifications (in-app, email, SMS)
- Target specific users, classes, or all
- Read status tracking
- Scheduled notifications

### 9. Message Model
- One-to-one messaging
- Attachments support
- Read receipts
- Conversation threading

### 10. IDCard Model
- Student ID card generation
- QR code/Barcode support
- Replacement tracking
- Validity period

### 11. AdmitCard Model
- Exam admit card generation
- Exam schedule on card
- Verification system
- Bulk generation support

### 12. Assignment Model
- Homework and assignments
- Submissions tracking
- Grading and feedback

### 13. Staff Model
- Staff information
- Department tracking
- Salary management

### 14. Fee Model
- Fee collection tracking
- Payment status
- Due date management

### 15. IncomeExpense Model
- Financial tracking
- Income and expense categorization
- Payment mode tracking

### 16. Bus Model
- Bus registration and route
- GPS tracking
- Driver information
- Live location tracking

---

## 🌐 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user

### Users (`/api/users`)
- `GET /` - Get all users (with role filter)
- `GET /:id` - Get user by ID
- `POST /` - Create user
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user

### Students (`/api/students`)
- `GET /` - Get all students (filters: class, section, status, academicYear)
- `GET /:id` - Get student by ID
- `GET /class/:classId` - Get students by class
- `POST /` - Create student
- `PUT /:id` - Update student
- `DELETE /:id` - Delete student

### Classes (`/api/classes`)
- `GET /` - Get all classes (filters: academicYear, status)
- `GET /:id` - Get class by ID
- `POST /` - Create class
- `PUT /:id` - Update class
- `DELETE /:id` - Delete class
- `POST /:id/students` - Add student to class
- `POST /:id/subjects` - Add subject to class

### Subjects (`/api/subjects`)
- `GET /` - Get all subjects (filters: classLevel, status, type)
- `GET /:id` - Get subject by ID
- `POST /` - Create subject
- `PUT /:id` - Update subject
- `DELETE /:id` - Delete subject

### Exams (`/api/exams`)
- `GET /` - Get all exams (filters: class, subject, academicYear, term, status)
- `GET /:id` - Get exam by ID
- `POST /` - Create exam
- `PUT /:id` - Update exam
- `DELETE /:id` - Delete exam
- `POST /:id/publish` - Publish exam result

### Marks (`/api/marks`)
- `GET /` - Get all marks (filters: student, exam, subject, class, academicYear, term)
- `GET /marksheet` - Get student marksheet with summary
- `GET /:id` - Get marks by ID
- `POST /` - Create marks (auto-calculates grade)
- `PUT /:id` - Update marks
- `DELETE /:id` - Delete marks
- `POST /:id/verify` - Verify marks

### Attendance (`/api/attendance`)
- `GET /` - Get all attendance (filters: student, class, date, status, academicYear)
- `GET /stats` - Get student attendance statistics
- `GET /class` - Get class attendance by date
- `GET /:id` - Get attendance by ID
- `POST /` - Mark attendance
- `POST /bulk` - Mark bulk attendance
- `PUT /:id` - Update attendance
- `DELETE /:id` - Delete attendance

### Notifications (`/api/notifications`)
- `GET /` - Get all notifications
- `GET /user/:userId` - Get user notifications
- `GET /user/:userId/unread-count` - Get unread count
- `GET /:id` - Get notification by ID
- `POST /` - Create notification
- `PUT /:id` - Update notification
- `DELETE /:id` - Delete notification
- `POST /:id/read` - Mark as read

### Messages (`/api/messages`)
- `GET /` - Get all messages
- `GET /conversation` - Get conversation between two users
- `GET /conversations/:userId` - Get user's conversations list
- `GET /unread-count/:userId` - Get unread message count
- `GET /:id` - Get message by ID
- `POST /` - Send message
- `PUT /:id` - Update message
- `DELETE /:id` - Delete message (soft delete)
- `POST /:id/read` - Mark as read

### ID Cards (`/api/idcards`)
- `GET /` - Get all ID cards (filters: student, academicYear, status)
- `GET /student/:studentId` - Get active ID card by student
- `GET /:id` - Get ID card by ID
- `POST /` - Create ID card
- `PUT /:id` - Update ID card
- `DELETE /:id` - Delete ID card
- `POST /:id/replace` - Replace lost/damaged ID card

### Admit Cards (`/api/admitcards`)
- `GET /` - Get all admit cards (filters: student, exam, academicYear, status)
- `GET /student/:studentId/exam/:examId` - Get admit card by student and exam
- `GET /:id` - Get admit card by ID
- `POST /` - Create admit card
- `POST /bulk` - Bulk create admit cards
- `PUT /:id` - Update admit card
- `DELETE /:id` - Delete admit card
- `POST /:id/verify` - Verify admit card
- `POST /:id/cancel` - Cancel admit card

### Assignments (`/api/assignments`)
- `GET /` - Get all assignments
- `GET /:id` - Get assignment by ID
- `POST /` - Create assignment
- `PUT /:id` - Update assignment
- `DELETE /:id` - Delete assignment

### Staff (`/api/staff`)
- `GET /` - Get all staff
- `GET /:id` - Get staff by ID
- `POST /` - Create staff
- `PUT /:id` - Update staff
- `DELETE /:id` - Delete staff

### Fees (`/api/fees`)
- `GET /` - Get all fees
- `GET /:id` - Get fee by ID
- `POST /` - Create fee
- `PUT /:id` - Update fee
- `DELETE /:id` - Delete fee

### Income/Expense (`/api/income-expense`)
- `GET /` - Get all income/expense records
- `GET /:id` - Get record by ID
- `POST /` - Create record
- `PUT /:id` - Update record
- `DELETE /:id` - Delete record

### Buses (`/api/buses`)
- `GET /` - Get all buses
- `GET /:id` - Get bus by ID
- `POST /` - Create bus
- `PUT /:id` - Update bus (including GPS location)
- `DELETE /:id` - Delete bus

---

## 🔧 Key Features

### Auto-Calculations
- **Marks**: Automatic grade and percentage calculation
- **Attendance**: Automatic percentage calculation

### Relationships
- Students linked to Users, Classes, and Bus Routes
- Classes linked to Teachers, Students, and Subjects
- Exams linked to Classes and Subjects
- Marks linked to Students, Exams, and Subjects
- ID Cards and Admit Cards linked to Students

### Advanced Features
- **Bulk Operations**: Bulk attendance marking, bulk admit card generation
- **Verification System**: Marks and admit card verification
- **Soft Delete**: Messages support soft delete
- **Read Status**: Notifications and messages track read status
- **File Attachments**: Messages and notifications support attachments
- **Scheduled Notifications**: Notifications can be scheduled for future
- **GPS Tracking**: Real-time bus location tracking

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB
- Environment variables (.env file)

### Environment Variables
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

### Installation
```bash
cd server
npm install
```

### Run Server
```bash
npm start
```

---

## 📊 Database Indexes
- Student: studentId, class, section
- Attendance: student + date + period (unique)
- Marks: student + exam + subject (unique)
- Class: className + section + academicYear (unique)
- Notifications: recipients.users, createdAt
- Messages: sender, receiver, conversationId

---

## 🔐 Security Features
- Password hashing with bcrypt
- JWT authentication ready
- Input validation
- Role-based access (admin, teacher, student, parent)

---

## 📝 Notes
- All timestamps are automatically managed (createdAt, updatedAt)
- Cascade deletes should be handled at application level
- File uploads for photos, documents need separate storage service (e.g., AWS S3, Cloudinary)
- Real-time features (chat, bus tracking) can be enhanced with WebSocket (Socket.io)

---

## 🎓 Complete Feature Coverage

This backend now supports ALL requirements from the School ERP specification:
✅ Income/Expense Management
✅ Fees Collection
✅ Student Management (Complete with all details)
✅ ID Card Generation (with QR/Barcode)
✅ Admit Card Generation (with exam schedule)
✅ Marksheet (with auto-grade calculation)
✅ Staff Management
✅ Home Work and Daily Assignments
✅ School Bus Live Location Tracking
✅ Notifications (Multi-channel)
✅ Chat/Messaging
✅ Attendance Tracking
✅ Class & Subject Management
✅ Exam Management

**Completion Status: 100% ✓**
