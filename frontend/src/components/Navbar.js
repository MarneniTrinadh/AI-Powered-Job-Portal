import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <div className="container">
        <ul>
          <li><Link to="/">Job Portal</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          {user ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/my-applications">My Applications</Link></li>
              {user.role === 'recruiter' && <li><Link to="/post-job">Post Job</Link></li>}
              {user.role === 'admin' && <li><Link to="/dashboard">Dashboard</Link></li>}
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
