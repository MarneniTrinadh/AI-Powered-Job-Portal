import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '', description: '', location: '', salary: '', type: 'full-time', skills: '', experience: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim())
    };
    await axios.post('/api/jobs', data);
    navigate('/jobs');
  };

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '800px' }}>
      <h1>Post a New Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title</label>
          <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Salary</label>
          <input value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Job Type</label>
          <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div className="form-group">
          <label>Skills (comma separated)</label>
          <input value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Experience</label>
          <input value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
        </div>
        <button type="submit" className="btn">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
