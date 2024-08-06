'use client'
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: query }) // Ensure that 'prompt' matches the API expectation
      });

      const data = await res.json();

      if (res.ok) {
        setResponses([...responses, { query, response: data.output }]);
      } else {
        setResponses([...responses, { query, response: data.error }]);
      }
    } catch (error) {
      console.error('Error submitting query:', error);
      setResponses([...responses, { query, response: 'Error submitting query' }]);
    }
    
    setQuery('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' , background: 'linear-gradient(90deg, rgba(196,174,238,1) 0%, rgba(148,183,233,1) 48%)', margin:'-10px', padding: '0px'}}>
      <h1 style={{color:'white'}}>ChatBot</h1>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        {responses.map((res, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <p><strong>You:</strong> {res.query}</p>
            <input 
              type="text" 
              value={res.response} 
              readOnly 
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
            />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Ask something..." 
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
