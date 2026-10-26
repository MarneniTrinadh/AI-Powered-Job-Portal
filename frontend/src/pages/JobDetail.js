import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await axios.get(`/api/jobs/${id}`);
      setJob(res.data);
    };
    fetchJob();
  }, [id]);

  const applyJob = async () => {
    try {
      await axios.post('/api/applications', { job: id });
      alert('Applied successfully!');
    } catch (error) {
      alert('Application failed');
    }
  };

  if (!job) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>{job.title}</h1>
      <h3>{job.company?.name}</h3>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Salary:</strong> {job.salary || 'Not specified'}</p>
      <p><strong>Description:</strong></p>
      <p>{job.description}</p>
      {user && user.role === 'candidate' && (
        <button onClick={applyJob} className="btn" style={{ marginTop: '2rem' }}>Apply Now</button>
      )}
    </div>
  );
};

export default JobDetail;
