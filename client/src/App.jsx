import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Register from './components/Register';
// import Search from './components/Search';
import Dashboard from './pages/Dashboard';

function App() {
  const [backendStatus, setBackendStatus] = useState('');
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem("role");
    return storedRole ? storedRole.toLowerCase() : null;
  });

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch('http://localhost:5000/');
        const data = await res.text();
        setBackendStatus(data);
      } catch (err) {
        console.error('Backend connection error:', err);
        setBackendStatus('❌ Backend unavailable');
      }
    };
    
    checkBackend();
  }, []);

  return (
    <>
      <Navbar role={role} setRole={setRole} />
      <div className='pt-16'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register setRole={setRole} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;