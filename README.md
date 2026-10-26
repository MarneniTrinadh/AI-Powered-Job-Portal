# AI-Powered Job Portal

## Setup

### Backend
1. Install Node.js and MongoDB
2. Navigate to `backend/`
3. Run `npm install`
4. Create a `.env` file (already created) with:
   - PORT=5000
   - MONGO_URI=mongodb://localhost:27017/job-portal
   - JWT_SECRET=your-secret-key
5. Start MongoDB
6. Run `npm run dev`

### Frontend
1. Navigate to `frontend/`
2. Run `npm install`
3. Run `npm start`

## Features

- Candidate: Register/Login, Profile Management, Apply for Jobs, Track Applications
- Recruiter: Post Jobs, View Applicants, Accept/Reject Candidates
- Admin: Dashboard, Manage Users, Manage Jobs

## Tech Stack

- Frontend: React, React Router, Axios
- Backend: Node.js, Express, JWT, Multer
- Database: MongoDB, Mongoose
