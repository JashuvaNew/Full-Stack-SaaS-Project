import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/register';
// import Home from './pages/Home';
import ProtectedRoute from './auth/ProtectedRoute';
// import ProFeature from './pages/proFeature';
import Success from './pages/success';
import Cancel from './pages/cancel';
import Header from './components/Header';
import Pricing from './pages/Pricing';
import AiChat from './pages/aiChat';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';


function App() {
  return (
  <BrowserRouter>
     <Header></Header>
  <Routes>
    {/* Public */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/pricing" element={<Pricing />} />

    {/* Protected */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    {/* Stripe */}
    <Route path="/success" element={<Success />} />
    <Route path="/cancel" element={<Cancel />} />
    <Route path = "/ai-chat" element={
      <ProtectedRoute>
        <AiChat />
      </ProtectedRoute>
    } />
  </Routes>
</BrowserRouter>

  );
}

export default App;
