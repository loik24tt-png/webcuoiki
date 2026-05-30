import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const API_URL = 'http://localhost:3001';

export default function CapNhatKetQua() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [score, setScore] = useState('0-0');
  const [scorers1, setScorers1] = useState([]);
  const [scorers2, setScorers2] = useState([]);
  const [assists1, setAssists1] = useState([]);
  const [assists2, setAssists2] = useState([]);
  
  // Input fields
  const [newScorer1, setNewScorer1] = useState('');
  const [newScorer2, setNewScorer2] = useState('');
  const [newAssist1, setNewAssist1] = useState('');
  const [newAssist2, setNewAssist2] = useState('');

  // Fetch match details
  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await fetch(`${API_URL}/matches/${matchId}`);
        if (!res.ok) throw new Error('Không tìm thấy trận đấu');
        const data = await res.json();
        setMatch(data);
        setScore(data.score || '0-0');
        setScorers1(data.scorers1 ? JSON.parse(data.scorers1) : []);
        setScorers2(data.scorers2 ? JSON.parse(data.scorers2) : []);
        setAssists1(data.assists1 ? JSON.parse(data.assists1) : []);
        setAssists2(data.assists2 ? JSON.parse(data.assists2) : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (matchId) fetchMatch();
  }, [matchId]);

  // Add scorer
  const addScorer = (team) => {
    if (team === 1 && newScorer1.trim()) {
      setScorers1([...scorers1, newScorer1.trim()]);
      setNewScorer1('');
      // Auto-increment score
      const [g1, g2] = score.split('-');
      setScore(`${parseInt(g1) + 1}-${g2}`);
    } else if (team === 2 && newScorer2.trim()) {
      setScorers2([...scorers2, newScorer2.trim()]);
      setNewScorer2('');
      // Auto-increment score
      const [g1, g2] = score.split('-');
      setScore(`${g1}-${parseInt(g2) + 1}`);
    }
  };

  // Remove scorer
  const removeScorer = (team, index) => {
    if (team === 1) {
      setScorers1(scorers1.filter((_, i) => i !== index));
      const [g1, g2] = score.split('-');
      setScore(`${Math.max(0, parseInt(g1) - 1)}-${g2}`);
    } else {
      setScorers2(scorers2.filter((_, i) => i !== index));
      const [g1, g2] = score.split('-');
      setScore(`${g1}-${Math.max(0, parseInt(g2) - 1)}`);
    }
  };

  // Add assist
  const addAssist = (team) => {
    if (team === 1 && newAssist1.trim()) {
      setAssists1([...assists1, newAssist1.trim()]);
      setNewAssist1('');
    } else if (team === 2 && newAssist2.trim()) {
      setAssists2([...assists2, newAssist2.trim()]);
      setNewAssist2('');
    }
  };

  // Remove assist
  const removeAssist = (team, index) => {
    if (team === 1) {
      setAssists1(assists1.filter((_, i) => i !== index));
    } else {
      setAssists2(assists2.filter((_, i) => i !== index));
    }
  };

  // Save match
  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(`${API_URL}/matches/${matchId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doi1: match.doi1,
          doi2: match.doi2,
          score,
          scorers1,
          scorers2,
          assists1,
          assists2,
          cards1: match.cards1 ? JSON.parse(match.cards1) : [],
          cards2: match.cards2 ? JSON.parse(match.cards2) : []
        })
      });

      if (!res.ok) throw new Error('Lỗi cập nhật trận đấu');
      alert('✅ Cập nhật kết quả thành công! Bảng xếp hạng đã được cập nhật.');
      navigate('/bang-xep-hang');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>⏳ Đang tải...</div>;
  if (!match) return <div className="container" style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>Không tìm thấy trận đấu</div>;

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
        ← Quay lại
      </button>

      <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          📝 Cập Nhật Kết Quả Trận Đấu
        </h2>
        <div style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
          {match.doi1} <span style={{ color: '#0066cc' }}>{score}</span> {match.doi2}
        </div>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', background: '#ffe6e6', borderRadius: '4px' }}>❌ {error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Đội 1 */}
        <div style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', background: '#f0f4ff' }}>
          <h3 style={{ textAlign: 'center', color: '#1e40af' }}>{match.doi1}</h3>

          {/* Bàn thắng */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4>⚽ Bàn Thắng ({scorers1.length})</h4>
            <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Tên cầu thủ ghi bàn"
                value={newScorer1}
                onChange={(e) => setNewScorer1(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addScorer(1)}
                style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <button onClick={() => addScorer(1)} style={{ padding: '0.5rem 1rem', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Thêm
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {scorers1.map((scorer, idx) => (
                <span key={idx} style={{ background: '#4CAF50', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {scorer}
                  <button onClick={() => removeScorer(1, idx)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Kiến tạo */}
          <div>
            <h4>🎯 Kiến Tạo ({assists1.length})</h4>
            <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Tên cầu thủ kiến tạo"
                value={newAssist1}
                onChange={(e) => setNewAssist1(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addAssist(1)}
                style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <button onClick={() => addAssist(1)} style={{ padding: '0.5rem 1rem', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Thêm
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {assists1.map((assist, idx) => (
                <span key={idx} style={{ background: '#2196F3', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {assist}
                  <button onClick={() => removeAssist(1, idx)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Đội 2 */}
        <div style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', background: '#fff0f5' }}>
          <h3 style={{ textAlign: 'center', color: '#c41e3a' }}>{match.doi2}</h3>

          {/* Bàn thắng */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4>⚽ Bàn Thắng ({scorers2.length})</h4>
            <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Tên cầu thủ ghi bàn"
                value={newScorer2}
                onChange={(e) => setNewScorer2(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addScorer(2)}
                style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <button onClick={() => addScorer(2)} style={{ padding: '0.5rem 1rem', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Thêm
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {scorers2.map((scorer, idx) => (
                <span key={idx} style={{ background: '#4CAF50', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {scorer}
                  <button onClick={() => removeScorer(2, idx)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Kiến tạo */}
          <div>
            <h4>🎯 Kiến Tạo ({assists2.length})</h4>
            <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Tên cầu thủ kiến tạo"
                value={newAssist2}
                onChange={(e) => setNewAssist2(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addAssist(2)}
                style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <button onClick={() => addAssist(2)} style={{ padding: '0.5rem 1rem', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Thêm
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {assists2.map((assist, idx) => (
                <span key={idx} style={{ background: '#2196F3', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {assist}
                  <button onClick={() => removeAssist(2, idx)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: '0.8rem 2rem',
            background: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          {saving ? '⏳ Đang lưu...' : '💾 Lưu Kết Quả'}
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '0.8rem 2rem',
            background: '#999',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Hủy
        </button>
      </div>
    </div>
  );
}
