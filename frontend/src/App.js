import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import MyApplications from './pages/MyApplications';
import Dashboard from './pages/Dashboard';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/post-job" element={user && (user.role === 'recruiter' || user.role === 'admin') ? <PostJob /> : <Navigate to="/" />} />
        <Route path="/my-applications" element={user ? <MyApplications /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user && user.role === 'admin' ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
