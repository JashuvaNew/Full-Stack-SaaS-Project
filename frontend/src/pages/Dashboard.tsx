import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { askAI } from '../api/ai';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const res = await askAI(prompt);
      setAnswer(res);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message || 'AI request failed');
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="dashboard">
    <h2>Dashboard</h2>

    {/* ROLE BADGE */}
    <div>
      <span
        className={`role-badge ${
          user?.role === 'PRO' ? 'role-pro' : 'role-free'
        }`}
      >
        {user?.role === 'PRO' ? '🚀 PRO Member' : '🆓 FREE Member'}
      </span>
    </div>

    <hr className="divider" />

    <h3>AI Assistant</h3>

    {/* ✅ AI ANSWER — ABOVE INPUT */}
    {answer && (
      <pre className="ai-answer">{answer}</pre>
    )}

    {/* ERROR */}
    {error && (
      <div className="ai-error">{error}</div>
    )}

    {/* FREE INFO */}
    {user?.role === 'FREE' && (
      <p className="ai-description">
        Free plan includes limited AI usage. Upgrade to unlock unlimited access.
      </p>
    )}

    {/* PROMPT INPUT */}
    <textarea
      className="ai-textarea"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      rows={4}
      placeholder="Ask the AI anything..."
    />

    <button
      className="primary-btn"
      onClick={submit}
      disabled={loading || !prompt}
    >
      {loading ? 'Thinking…' : 'Ask AI'}
    </button>

    {/* UPGRADE CTA */}
    {user?.role === 'FREE' && (
      <button
        className="secondary-btn"
        onClick={() => navigate('/pricing')}
      >
        Upgrade to PRO 🚀
      </button>
    )}
  </div>
);

}
