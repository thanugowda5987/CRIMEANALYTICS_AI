import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Mail } from 'lucide-react';
import { loginUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginUser(form);
      const { user, token } = res.data.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sidebar-gradient p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass w-full max-w-md p-8 rounded-card"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="h-14 w-14 rounded-2xl bg-button-gradient flex items-center justify-center text-white mb-3">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-xl font-heading font-semibold text-center">
            KSP AI Crime Analytics
          </h1>
          <p className="text-sm text-textDark/60 text-center mt-1">
            Karnataka State Police — Secure Portal
          </p>
        </div>

        {error && (
          <div className="bg-danger/10 text-danger text-sm rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-white">
            <Mail size={16} className="text-textDark/40" />
            <input
              type="email"
              name="email"
              placeholder="Official Email"
              value={form.email}
              onChange={handleChange}
              required
              className="flex-1 text-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-white">
            <Lock size={16} className="text-textDark/40" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="flex-1 text-sm focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-button-gradient text-white font-medium disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-xs text-center text-textDark/50 mt-6">
          Authorized personnel only. All access is logged and monitored.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;