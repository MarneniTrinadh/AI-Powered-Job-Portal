import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await axios.get('/api/applications/my-applications');
      setApplications(res.data);
    };
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`/api/applications/${id}/status`, { status });
    setApplications(applications.map(a => a._id === id ? { ...a, status } : a));
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>My Applications</h1>
      <div className="jobs">
        {applications.map(app => (
          <div key={app._id} className="card">
            <h3>{app.job?.title}</h3>
            <p>Status: {app.status}</p>
            {user?.role !== 'candidate' && (
              <div>
                <button onClick={() => updateStatus(app._id, 'accepted')} className="btn" style={{ background: '#28a745', marginRight: '0.5rem' }}>Accept</button>
                <button onClick={() => updateStatus(app._id, 'rejected')} className="btn" style={{ background: '#dc3545' }}>Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
