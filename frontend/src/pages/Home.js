import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>AI-Powered Job Portal</h1>
          <p>Find your dream job or hire the perfect candidate</p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/jobs" className="btn">Find Jobs</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
