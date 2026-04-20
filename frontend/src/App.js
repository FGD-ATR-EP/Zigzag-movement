import React, { useState } from 'react';
import axios from 'axios';
import { Activity, Link as LinkIcon, ShieldCheck } from 'lucide-react';
const App = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [sim, setSim] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const analyze = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/analyze-link', { url });
      setData(res.data);
      const s = await axios.post('http://localhost:5000/api/simulate', res.data);
      setSim(s.data);
    } catch (e) { alert('Error'); }
    setLoading(false);
  };
  if (showDisclaimer) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'sans-serif' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '15px', maxWidth: '500px', textAlign: 'center' }}>
        <ShieldCheck size={48} color="#e67e22" style={{ marginBottom: '20px' }} />
        <h2>Academic Research Platform</h2>
        <p>This tool is for statistical analysis and probability education. 18+.</p>
        <button onClick={() => setShowDisclaimer(false)} style={{ width: '100%', padding: '12px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>I Accept</button>
      </div>
    </div>
  );
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>🎰 Slot Stats Pro</h1>
      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Game URL" style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
          <button onClick={analyze} disabled={loading} style={{ padding: '12px 24px', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px' }}>{loading ? '...' : 'Analyze'}</button>
        </div>
      </div>
      {data && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
            <h3>Game Info</h3>
            <p><strong>{data.name}</strong></p>
            <p>RTP: {data.advertised_rtp}% | Volatility: {data.volatility}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
            <h3>Simulation Results</h3>
            {sim ? <div>Balance: {sim.final_balance.toFixed(2)} | RTP Achieved: {sim.rtp_achieved.toFixed(2)}%</div> : '...'}
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
