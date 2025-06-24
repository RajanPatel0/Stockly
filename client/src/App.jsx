import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => {
        console.error('Error connecting to backend:', err);
        setMessage('❌ Could not connect to backend');
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Initial Connection Test 🚀</h1>
      <p className="text-xl text-gray-700">{message}</p>
    </div>
  );
}

export default App;
