import React, { useState } from 'react';
import axios from 'axios';

function ApplicationStatus() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/students/status/${email}`);
      setStatus(res.data.status);
    } catch (err) {
      console.error(err.response.data);
      setStatus('Not found');
    }
  };

  return (
    <div>
      <h2>Check Application Status</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit">Check Status</button>
      </form>
      {status && <p>Your application status: {status}</p>}
    </div>
  );
}

export default ApplicationStatus;