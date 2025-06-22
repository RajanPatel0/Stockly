import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')  // your backend URL
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => {
        console.error('Error connecting to backend:', err);
        setMessage('❌ Could not connect to backend');
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Initial Connection Test 🚀</h1>
      <p>{message}</p>   {/*this is response from backend "/" route here*/}
    </div>
  );
}

export default App;
