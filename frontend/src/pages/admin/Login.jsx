import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      const dest = location.state?.from?.pathname || '/admin';
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-text">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-8 shadow-glow">
        <p className="font-mono text-xs text-amber">$ ssh admin@portfolio</p>
        <h1 className="mt-2 text-xl font-bold">Admin login</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block font-mono text-xs text-muted">email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-border bg-surface2 px-3 py-2 font-mono text-sm outline-none focus-visible:border-amber"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs text-muted">password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-border bg-surface2 px-3 py-2 font-mono text-sm outline-none focus-visible:border-amber"
            />
          </div>
          {error && <p className="font-mono text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-amber px-4 py-2.5 font-mono text-sm font-semibold text-ink disabled:opacity-60"
          >
            {loading ? 'signing in…' : 'sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
