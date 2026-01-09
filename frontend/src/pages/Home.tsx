import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1 className="hero-title">
          Talk with AI. <span>Smarter.</span>
        </h1>

        <p className="hero-subtitle">
          An AI-powered SaaS platform with secure access, usage limits,
          and seamless upgrades.
        </p>

        <div className="hero-actions">
          <Link to="/register" className="btn primary">
            Get Started Free
          </Link>
          <Link to="/pricing" className="btn outline">
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
