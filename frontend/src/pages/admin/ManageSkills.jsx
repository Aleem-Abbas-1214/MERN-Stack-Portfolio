import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'];
const EMPTY = { name: '', category: 'Frontend', proficiency: 70, order: 0 };

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = () => api.get('/skills').then((res) => setSkills(res.data));

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(EMPTY);
    setEditingId(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = { ...form, proficiency: Number(form.proficiency), order: Number(form.order) };
    try {
      if (editingId) {
        await api.put(`/skills/${editingId}`, payload);
      } else {
        await api.post('/skills', payload);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save skill');
    }
  };

  const handleEdit = (s) => {
    setEditingId(s._id);
    setForm({ name: s.name, category: s.category, proficiency: s.proficiency, order: s.order });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    await api.delete(`/skills/${id}`);
    load();
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Skills</h1>
      <p className="mt-1 font-mono text-sm text-muted">Manage the skills shown on your portfolio.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
          <h2 className="font-mono text-sm text-amber">{editingId ? 'Edit skill' : 'New skill'}</h2>

          <div>
            <label className="mb-1.5 block font-mono text-xs text-muted">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded border border-border bg-surface2 px-3 py-2 font-mono text-sm outline-none focus-visible:border-amber"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs text-muted">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded border border-border bg-surface2 px-3 py-2 font-mono text-sm outline-none focus-visible:border-amber"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs text-muted">
              Proficiency: {form.proficiency}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={form.proficiency}
              onChange={(e) => setForm({ ...form, proficiency: e.target.value })}
              className="w-full accent-amber"
            />
          </div>

          <div className="w-28">
            <label className="mb-1.5 block font-mono text-xs text-muted">Order</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: e.target.value })}
              className="w-full rounded border border-border bg-surface2 px-3 py-2 font-mono text-sm outline-none focus-visible:border-amber"
            />
          </div>

          {error && <p className="font-mono text-xs text-red-400">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" className="rounded bg-amber px-4 py-2 font-mono text-sm font-semibold text-ink">
              {editingId ? 'Save changes' : 'Add skill'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded border border-border px-4 py-2 font-mono text-sm text-muted">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="space-y-3">
          {skills.length === 0 && <p className="font-mono text-sm text-muted">No skills yet.</p>}
          {skills.map((s) => (
            <div key={s._id} className="flex items-center justify-between rounded-lg border border-border bg-surface p-4">
              <div>
                <p className="font-mono text-sm text-text">{s.name}</p>
                <p className="font-mono text-xs text-muted">{s.category} · {s.proficiency}%</p>
              </div>
              <div className="flex gap-2 font-mono text-xs">
                <button onClick={() => handleEdit(s)} className="text-amber hover:underline">edit</button>
                <button onClick={() => handleDelete(s._id)} className="text-red-400 hover:underline">delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
