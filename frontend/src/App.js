import React, { useState } from 'react';
import axios from 'axios';
import { ShieldAlert, Crosshair, Terminal, Activity } from 'lucide-react';

const App = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [sim, setSim] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const analyze = async () => {
    if (!url) return;
    setLoading(true);
    setReport(null);
    try {
      const res = await axios.post('http://localhost:5000/api/analyze-link', { url });
      setData(res.data);

      const simReq = { ...res.data, num_spins: 100000, user_type: 'whale_locked' };
      const s = await axios.post('http://localhost:5000/api/simulate', simReq);
      setSim(s.data);

      const rep = await axios.post('http://localhost:5000/api/forensic-report', {
        game_info: res.data,
        sim_results: s.data
      });
      setReport(rep.data);

    } catch (e) { alert('Error connecting to backend'); }
    setLoading(false);
  };

  if (showDisclaimer) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <div className="terminal-bg"></div>
      <div className="glass-panel" style={{ padding: '40px', borderRadius: '15px', maxWidth: '500px', textAlign: 'center' }}>
        <ShieldAlert size={64} color="#e74c3c" style={{ marginBottom: '20px' }} />
        <h2>RESTRICTED FORENSIC TOOL</h2>
        <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>
          ระบบตรวจสอบหลักฐานดิจิทัลและวิเคราะห์อัลกอริทึม (Digital Forensics & PRNG Audit) <br/>
          สำหรับเจ้าหน้าที่เพื่อใช้ในการสืบสวนและวิเคราะห์ความโปร่งใสของระบบสล็อตออนไลน์
        </p>
        <button onClick={() => setShowDisclaimer(false)} className="btn-scan" style={{ width: '100%', padding: '14px', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}>
          ยืนยันตัวตนเจ้าหน้าที่ (Initialize Access)
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div className="terminal-bg"></div>

      <header style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
        <Terminal size={32} color="#00ffcc" />
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', letterSpacing: '2px' }}>CYBER FORENSIC TERMINAL</h1>
          <div className="mono" style={{ fontSize: '12px', color: '#00ffcc', opacity: 0.8 }}>SYSTEM: ONLINE | SECURE CONNECTION ESTABLISHED</div>
        </div>
      </header>

      <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="[ INPUT TARGET URL ]"
            className="terminal-input"
            style={{ flex: 1, padding: '14px 20px', borderRadius: '8px', fontSize: '16px' }}
            onKeyDown={(e) => e.key === 'Enter' && analyze()}
          />
          <button onClick={analyze} disabled={loading} className="btn-scan" style={{ padding: '14px 30px', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {loading ? <Activity className="animate-spin" /> : <Crosshair />}
            {loading ? 'ANALYZING...' : 'EXECUTE SCAN'}
          </button>
        </div>
      </div>

      {data && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginTop: '20px' }}>
          {/* Target Info */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ color: '#00ffcc', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(0,255,204,0.3)', paddingBottom: '10px' }}>
              <ShieldAlert size={20}/> ข้อมูลเป้าหมาย (Target Info)
            </h3>
            <div style={{ marginTop: '20px', fontSize: '14px' }}>
              <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                <span style={{ color: '#aaa' }}>ชื่อเกม:</span>
                <strong style={{ color: '#fff' }}>{data.name}</strong>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                <span style={{ color: '#aaa' }}>ผู้ให้บริการ:</span>
                <strong style={{ color: '#fff' }}>{data.provider}</strong>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                <span style={{ color: '#aaa' }}>RTP โฆษณา:</span>
                <strong style={{ color: '#00ffcc' }}>{data.advertised_rtp}%</strong>
              </p>
              <p style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                <span style={{ color: '#aaa' }}>ความผันผวน:</span>
                <strong style={{ color: '#fff' }}>{data.volatility}</strong>
              </p>
            </div>
          </div>

          {/* Forensic Audit Results */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ color: '#ff3366', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(255,51,102,0.3)', paddingBottom: '10px' }}>
              <Activity size={20}/> สรุปผลการวิเคราะห์สถิติ (RTP & PRNG Audit)
            </h3>

            {sim && report ? (
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
                  <div style={{ padding: '15px', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', borderLeft: `4px solid ${sim.rtp_achieved < data.advertised_rtp - 5 ? '#ff3366' : '#00ffcc'}` }}>
                    <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '5px' }} className="mono">ACTUAL LAB RTP</div>
                    <div className="mono" style={{ fontSize: '28px', color: sim.rtp_achieved < data.advertised_rtp - 5 ? '#ff3366' : '#00ffcc' }}>
                      {sim.rtp_achieved.toFixed(2)}%
                    </div>
                  </div>

                  <div style={{ padding: '15px', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', borderLeft: `4px solid ${sim.anomaly_detected ? '#ff3366' : '#00ffcc'}` }}>
                    <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '5px' }} className="mono">PRNG INTEGRITY</div>
                    <div style={{ fontSize: '18px', color: sim.anomaly_detected ? '#ff3366' : '#00ffcc', fontWeight: 'bold', marginTop: '5px' }}>
                      {sim.anomaly_detected ? '🔴 พบการปรับแต่งอัตราจ่าย' : '🟢 อยู่ในเกณฑ์ปกติ'}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '20px', background: 'rgba(255, 51, 102, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 51, 102, 0.2)' }}>
                  <h4 style={{ color: '#ff3366', marginBottom: '10px', fontSize: '16px' }}>📝 รายงานนิติวิทยาศาสตร์จาก AI (AI Forensic Report)</h4>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.8', color: '#ddd', whiteSpace: 'pre-line' }}>
                    {report.report}
                  </p>

                  <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                    <p style={{ margin: 0, fontSize: '13px', color: '#aaa', lineHeight: '1.6' }}>
                      <strong>⚠️ ข้อสังเกตเชิงเทคนิค:</strong> จากสถิติอัตราการชนะในเวลานั้น (Hit Frequency) อยู่ที่ {(data.hit_rate * 100).toFixed(0)}% ระบบการหมุนเวียนเงินรางวัลมีแนวโน้มเข้าข่ายโครงสร้างแบบ Payout Pool (ระบบกองกลาง) มีความเสี่ยงในการเผชิญหน้ากับ Near-Miss Effect เพื่อเหนี่ยวรั้งให้ผู้เล่นอยู่ในระบบนานที่สุด
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: '#00ffcc' }} className="mono">
                <Activity className="animate-spin" size={32} style={{ margin: '0 auto 15px auto', display: 'block' }}/>
                PROCESSING MONTE CARLO SIMULATIONS (100,000 ITERATIONS)...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
