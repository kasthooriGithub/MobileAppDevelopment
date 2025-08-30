import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="card shadow-lg p-4">
      <div className="card-body text-center">
        <h1 className="card-title">Welcome to mobile_app_dev</h1>
        <p className="card-text">Manage your data efficiently using our mobile app.</p>
        <Link to="/registration" className="btn btn-primary btn-lg">
          Register Now
        </Link>
      </div>
    </div>
  );
}

export default Home;
