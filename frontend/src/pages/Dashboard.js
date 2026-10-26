import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, jobsRes] = await Promise.all([
        axios.get('/api/users'),
        axios.get('/api/jobs')
      ]);
      setUsers(usersRes.data);
      setJobs(jobsRes.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ marginBottom: '3rem' }}>
        <h2>Users ({users.length})</h2>
        <div className="jobs">
          {users.map(user => (
            <div key={user._id} className="card">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Jobs ({jobs.length})</h2>
        <div className="jobs">
          {jobs.map(job => (
            <div key={job._id} className="card">
              <h3>{job.title}</h3>
              <p>{job.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
