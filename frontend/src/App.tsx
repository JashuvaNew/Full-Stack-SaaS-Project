import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/register';
import Home from './pages/Home';
import ProtectedRoute from './auth/ProtectedRoute';
import ProFeature from './pages/proFeature';
import Success from './pages/success';
import Cancel from './pages/cancel';
import Header from './components/Header';
import Pricing from './pages/Pricing';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/pro"
          element={
            <ProtectedRoute requiredRole="PRO">
              <ProFeature />
            </ProtectedRoute>
          }
        />
        <Route path="/upgrade" element={<h2>Upgrade to PRO 🚀</h2>} />
        <Route path="/success" element={<Success />} />
<Route path="/cancel" element={<Cancel />} />
<Route path="/pricing" element={<Pricing />} />

          

      </Routes>
    </BrowserRouter>
  );
}

export default App;
