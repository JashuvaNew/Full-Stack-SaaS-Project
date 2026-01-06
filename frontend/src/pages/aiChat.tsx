import { useState } from 'react';
import { askAI } from '../api/ai';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';



export default function AiChat() {
    const { user } = useAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  if (user?.role === 'FREE') {
    return (
      <div style={{ padding: 20 }}>
        <h2>AI Assistant</h2>
        <p>Free plan allows limited AI usage.</p>
        <p>Upgrade to PRO for unlimited access 🚀</p>

        <button onClick={() => navigate('/pricing')}>
          Upgrade to PRO
        </button>
      </div>
    );
  }


  const submit = async () => {
    setLoading(true);
    try {
      const res = await askAI(prompt);
      setAnswer(res);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Assistant</h2>

      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        rows={5}
        style={{ width: '100%' }}
      />

      <button onClick={submit} disabled={loading}>
        Ask AI
      </button>

      {answer && <pre>{answer}</pre>}
    </div>
  );
}
