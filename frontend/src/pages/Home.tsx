
import UpgradeButton from '../components/upgradeButton';
import './Home.css';
function Home() {
  return (
    <div className="home-container">
       <div style={{ padding: '2rem' }}>
      <h2>Welcome to SaaS App</h2>

      <UpgradeButton />
    </div>
    </div>
  );
}

export default Home;