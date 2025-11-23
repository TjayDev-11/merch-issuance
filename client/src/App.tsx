import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Inventory from './pages/Inventory';
import Issuance from './pages/Issuance';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<div>Dashboard Page (To be built)</div>} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/issuance" element={<Issuance />} />
            <Route path="/reports" element={<div>Reports Page (To be built)</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;