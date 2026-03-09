# Quick Start Guide - Testing New Endpoints

## Sample API Requests

Use these sample requests to test the new endpoints. You can use Postman, Thunder Client, or add them to your `test.http` file.

---

## 1. Student Management

### Create Student
```http
POST http://localhost:5000/api/students
Content-Type: application/json

{
  "userId": "user_id_here",
  "studentId": "STU2026001",
  "rollNumber": "101",
  "admissionNumber": "ADM2026001",
  "admissionDate": "2026-04-01",
  "firstName": "Rahul",
  "lastName": "Kumar",
  "dateOfBirth": "2010-05-15",
  "gender": "male",
  "bloodGroup": "O+",
  "class": "class_id_here",
  "section": "A",
  "academicYear": "2026-2027",
  "father": {
    "name": "Suresh Kumar",
    "phone": "9876543210",
    "email": "suresh@example.com",
    "occupation": "Engineer"
  }
}
```

### Get All Students
```http
GET http://localhost:5000/api/students
```

### Get Students by Class
```http
GET http://localhost:5000/api/students/class/class_id_here
```

---

## 2. Class Management

### Create Class
```http
POST http://localhost:5000/api/classes
Content-Type: application/json

{
  "className": "Class 10",
  "section": "A",
  "academicYear": "2026-2027",
  "capacity": 40,
  "room": "Room 101"
}
```

### Get All Classes
```http
GET http://localhost:5000/api/classes?academicYear=2026-2027
```

---

## 3. Subject Management

### Create Subject
```http
POST http://localhost:5000/api/subjects
Content-Type: application/json

{
  "subjectName": "Mathematics",
  "subjectCode": "MATH101",
  "classLevel": "Class 10",
  "type": "core",
  "totalMarks": 100,
  "passingMarks": 33
}
```

### Get All Subjects
```http
GET http://localhost:5000/api/subjects
```

---

## 4. Exam Management

### Create Exam
```http
POST http://localhost:5000/api/exams
Content-Type: application/json

{
  "examName": "Mid Term Examination",
  "examType": "mid-term",
  "class": "class_id_here",
  "subject": "subject_id_here",
  "academicYear": "2026-2027",
  "term": "1st Term",
  "examDate": "2026-07-15",
  "startTime": "09:00",
  "endTime": "12:00",
  "totalMarks": 100,
  "passingMarks": 33,
  "room": "Hall A"
}
```

### Get All Exams
```http
GET http://localhost:5000/api/exams?academicYear=2026-2027
```

---

## 5. Marks Management

### Create Marks
```http
POST http://localhost:5000/api/marks
Content-Type: application/json

{
  "student": "student_id_here",
  "exam": "exam_id_here",
  "subject": "subject_id_here",
  "class": "class_id_here",
  "marksObtained": 85,
  "totalMarks": 100,
  "academicYear": "2026-2027",
  "term": "1st Term",
  "enteredBy": "teacher_user_id"
}
```

### Get Student Marksheet
```http
GET http://localhost:5000/api/marks/marksheet?studentId=student_id_here&academicYear=2026-2027&term=1st Term
```

### Verify Marks
```http
POST http://localhost:5000/api/marks/marks_id_here/verify
Content-Type: application/json

{
  "userId": "verifier_user_id"
}
```

---

## 6. Attendance Management

### Mark Attendance
```http
POST http://localhost:5000/api/attendance
Content-Type: application/json

{
  "student": "student_id_here",
  "class": "class_id_here",
  "date": "2026-03-09",
  "status": "present",
  "markedBy": "teacher_user_id",
  "academicYear": "2026-2027"
}
```

### Mark Bulk Attendance
```http
POST http://localhost:5000/api/attendance/bulk
Content-Type: application/json

{
  "attendanceRecords": [
    {
      "student": "student_id_1",
      "class": "class_id_here",
      "date": "2026-03-09",
      "status": "present",
      "markedBy": "teacher_user_id",
      "academicYear": "2026-2027"
    },
    {
      "student": "student_id_2",
      "class": "class_id_here",
      "date": "2026-03-09",
      "status": "absent",
      "markedBy": "teacher_user_id",
      "academicYear": "2026-2027"
    }
  ]
}
```

### Get Attendance Statistics
```http
GET http://localhost:5000/api/attendance/stats?studentId=student_id_here&startDate=2026-01-01&endDate=2026-03-31
```

---

## 7. Notification Management

### Create Notification
```http
POST http://localhost:5000/api/notifications
Content-Type: application/json

{
  "title": "Important Announcement",
  "message": "School will remain closed tomorrow due to public holiday.",
  "type": "announcement",
  "priority": "high",
  "sender": "admin_user_id",
  "recipients": {
    "userType": "all"
  },
  "channels": {
    "inApp": true,
    "email": true,
    "sms": false
  }
}
```

### Get User Notifications
```http
GET http://localhost:5000/api/notifications/user/user_id_here
```

### Get Unread Count
```http
GET http://localhost:5000/api/notifications/user/user_id_here/unread-count
```

### Mark as Read
```http
POST http://localhost:5000/api/notifications/notification_id_here/read
Content-Type: application/json

{
  "userId": "user_id_here"
}
```

---

## 8. Messaging System

### Send Message
```http
POST http://localhost:5000/api/messages
Content-Type: application/json

{
  "sender": "user_id_1",
  "receiver": "user_id_2",
  "subject": "Regarding Homework",
  "message": "Please submit your homework by tomorrow.",
  "messageType": "text"
}
```

### Get Conversation
```http
GET http://localhost:5000/api/messages/conversation?user1=user_id_1&user2=user_id_2
```

### Get Conversations List
```http
GET http://localhost:5000/api/messages/conversations/user_id_here
```

### Get Unread Message Count
```http
GET http://localhost:5000/api/messages/unread-count/user_id_here
```

---

## 9. ID Card Management

### Create ID Card
```http
POST http://localhost:5000/api/idcards
Content-Type: application/json

{
  "student": "student_id_here",
  "cardNumber": "ID2026001",
  "academicYear": "2026-2027",
  "validFrom": "2026-04-01",
  "validTill": "2027-03-31",
  "qrCode": "QR_CODE_DATA",
  "bloodGroup": "O+",
  "emergencyContact": "9876543210",
  "issuedBy": "admin_user_id"
}
```

### Get Student ID Card
```http
GET http://localhost:5000/api/idcards/student/student_id_here
```

### Replace ID Card
```http
POST http://localhost:5000/api/idcards/id_card_id/replace
Content-Type: application/json

{
  "reason": "lost",
  "newCardData": {
    "student": "student_id_here",
    "cardNumber": "ID2026001-R1",
    "academicYear": "2026-2027",
    "validFrom": "2026-03-10",
    "validTill": "2027-03-31",
    "issuedBy": "admin_user_id"
  }
}
```

---

## 10. Admit Card Management

### Create Admit Card
```http
POST http://localhost:5000/api/admitcards
Content-Type: application/json

{
  "student": "student_id_here",
  "exam": "exam_id_here",
  "cardNumber": "ADMIT2026001",
  "rollNumber": "101",
  "academicYear": "2026-2027",
  "term": "1st Term",
  "examSchedule": [
    {
      "subject": "subject_id_1",
      "examDate": "2026-07-15",
      "startTime": "09:00",
      "endTime": "12:00",
      "room": "Hall A"
    },
    {
      "subject": "subject_id_2",
      "examDate": "2026-07-16",
      "startTime": "09:00",
      "endTime": "12:00",
      "room": "Hall A"
    }
  ],
  "examCenter": {
    "name": "Main School Building",
    "address": "School Address Here",
    "room": "Hall A"
  },
  "reportingTime": "08:30 AM",
  "issuedBy": "admin_user_id"
}
```

### Bulk Create Admit Cards
```http
POST http://localhost:5000/api/admitcards/bulk
Content-Type: application/json

{
  "admitCards": [
    {
      "student": "student_id_1",
      "exam": "exam_id_here",
      "cardNumber": "ADMIT2026001",
      "rollNumber": "101",
      "academicYear": "2026-2027",
      "issuedBy": "admin_user_id"
    },
    {
      "student": "student_id_2",
      "exam": "exam_id_here",
      "cardNumber": "ADMIT2026002",
      "rollNumber": "102",
      "academicYear": "2026-2027",
      "issuedBy": "admin_user_id"
    }
  ]
}
```

### Get Admit Card by Student and Exam
```http
GET http://localhost:5000/api/admitcards/student/student_id_here/exam/exam_id_here
```

### Verify Admit Card
```http
POST http://localhost:5000/api/admitcards/admit_card_id/verify
Content-Type: application/json

{
  "userId": "verifier_user_id"
}
```

---

## Testing Workflow

### Step 1: Create Base Data
1. Create a User (teacher)
2. Create Subjects
3. Create a Class
4. Create a User (student)
5. Create Student profile

### Step 2: Academic Operations
1. Create Exams
2. Mark Attendance
3. Enter Marks
4. Generate Marksheet

### Step 3: Documents
1. Generate ID Card
2. Generate Admit Card

### Step 4: Communication
1. Send Notifications
2. Send Messages

---

## Common Query Parameters

### Filtering
- `?status=active`
- `?academicYear=2026-2027`
- `?class=class_id`
- `?role=student`

### Pagination (if implemented)
- `?page=1&limit=10`

---

## Response Format

All endpoints return JSON:

### Success Response
```json
{
  "_id": "document_id",
  "field1": "value1",
  "field2": "value2",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Error Response
```json
{
  "error": "Error message here"
}
```

---

## Tips

1. **IDs**: Replace `_id_here` placeholders with actual MongoDB ObjectIDs
2. **Dates**: Use ISO format (YYYY-MM-DD)
3. **Testing Tool**: Use VS Code REST Client extension with .http files
4. **Authentication**: Add JWT auth middleware later to protect routes
5. **Validation**: Consider adding input validation middleware

---

Happy Testing! 🚀
