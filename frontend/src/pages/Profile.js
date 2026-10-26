import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    bio: '', skills: '', education: '', experience: '', portfolioLinks: '', resume: null });

  useEffect(() => {
    if (user) {
      setFormData({
        bio: user.profile?.bio || '',
        skills: user.profile?.skills?.join(', ') || '',
        education: user.profile?.education?.map(e => `${e.school}, ${e.degree}, ${e.year}`).join('\n') || '',
        experience: user.profile?.experience?.map(e => `${e.company}, ${e.position}, ${e.duration}`).join('\n') || '',
        portfolioLinks: user.profile?.portfolioLinks?.join(', ') || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'resume') {
        if (formData[key]) data.append('resume', formData[key]);
      } else if (key === 'skills') {
        data.append('profile.skills', formData[key]);
      } else if (key === 'portfolioLinks') {
        data.append('profile.portfolioLinks', formData[key]);
      } else if (key === 'education') {
        const edus = formData[key].split('\n').filter(e => e).map(e => {
          const parts = e.split(',');
          return { school: parts[0]?.trim() || '', degree: parts[1]?.trim() || '', year: parts[2]?.trim() || '' };
        });
        data.append('profile.education', JSON.stringify(edus));
      } else if (key === 'experience') {
        const exps = formData[key].split('\n').filter(e => e).map(e => {
          const parts = e.split(',');
          return { company: parts[0]?.trim() || '', position: parts[1]?.trim() || '', duration: parts[2]?.trim() || '' };
        });
        data.append('profile.experience', JSON.stringify(exps));
      } else {
        data.append(`profile.${key}`, formData[key]);
      }
    });
    const res = await axios.put('/api/users/profile', data);
    setUser(res.data);
    alert('Profile updated!');
  };

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '800px' }}>
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Bio</label>
          <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Skills (comma separated)</label>
          <input value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Education (each line: School, Degree, Year)</label>
          <textarea value={formData.education} onChange={(e) => setFormData({ ...formData, education: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Experience (each line: Company, Position, Duration)</label>
          <textarea value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Portfolio Links (comma separated)</label>
          <input value={formData.portfolioLinks} onChange={(e) => setFormData({ ...formData, portfolioLinks: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Resume (PDF)</label>
          <input type="file" onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })} />
        </div>
        <button type="submit" className="btn">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
