import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get('/api/jobs');
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>Available Jobs</h2>
      <div className="jobs">
        {jobs.map(job => (
          <div key={job._id} className="card">
            <h3>{job.title}</h3>
            <p>{job.company?.name}</p>
            <p>{job.location}</p>
            <p>{job.type}</p>
            <Link to={`/jobs/${job._id}`} className="btn" style={{ marginTop: '1rem' }}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
