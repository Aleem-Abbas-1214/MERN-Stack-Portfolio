import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';

const EMPTY = {
  title: '',
  slug: '',
  description: '',
  longDescription: '',
  techStack: '',
  imageUrl: '',
  githubUrl: '',
  liveUrl: '',
  featured: false,
  order: 0,
};

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = () => api.get('/projects').then((res) => setProjects(res.data));

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(EMPTY);
    setEditingId(null);
    setError('');
  };

  const slugify = (s) =>
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      techStack: form.techStack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      order: Number(form.order) || 0,
    };
    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
    }
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title,
      slug: p.slug,
      description: p.description,
      longDescription: p.longDescription || '',
      techStack: (p.techStack || []).join(', '),
      imageUrl: p.imageUrl || '',
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || '',
      featured: p.featured,
      order: p.order,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Projects</h1>
      <p className="mt-1 font-mono text-sm text-muted">Add, edit, or remove portfolio projects.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
          <h2 className="font-mono text-sm text-amber">
            {editingId ? 'Edit project' : 'New project'}
          </h2>

          <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          <Input label="Slug (optional, auto-generated)" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
          <Textarea label="Short description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />
          <Textarea label="Long description" value={form.longDescription} onChange={(v) => setForm({ ...form, longDescription: v })} />
          <Input label="Tech stack (comma separated)" value={form.techStack} onChange={(v) => setForm({ ...form, techStack: v })} />
          <Input label="Image URL" value={form.imageUrl} onChange={(v) => setForm({ ...form, imageUrl: v })} />
          <Input label="GitHub URL" value={form.githubUrl} onChange={(v) => setForm({ ...form, githubUrl: v })} />
          <Input label="Live URL" value={form.liveUrl} onChange={(v) => setForm({ ...form, liveUrl: v })} />
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 font-mono text-xs text-muted">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              featured
            </label>
            <Input label="Order" type="number" value={form.order} onChange={(v) => setForm({ ...form, order: v })} small />
          </div>

          {error && <p className="font-mono text-xs text-red-400">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" className="rounded bg-amber px-4 py-2 font-mono text-sm font-semibold text-ink">
              {editingId ? 'Save changes' : 'Add project'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded border border-border px-4 py-2 font-mono text-sm text-muted">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="space-y-3">
          {projects.length === 0 && <p className="font-mono text-sm text-muted">No projects yet.</p>}
          {projects.map((p) => (
            <div key={p._id} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-sm font-semibold text-text">{p.title}</p>
                  <p className="mt-1 text-xs text-muted">{p.description}</p>
                </div>
                <div className="flex shrink-0 gap-2 font-mono text-xs">
                  <button onClick={() => handleEdit(p)} className="text-amber hover:underline">edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:underline">delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

function Input({ label, value, onChange, type = 'text', required = false, small = false }) {
  return (
    <div className={small ? 'w-28' : ''}>
      <label className="mb-1.5 block font-mono text-xs text-muted">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-border bg-surface2 px-3 py-2 font-mono text-sm outline-none focus-visible:border-amber"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, required = false }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs text-muted">{label}</label>
      <textarea
        rows={3}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-border bg-surface2 px-3 py-2 font-mono text-sm outline-none focus-visible:border-amber"
      />
    </div>
  );
}
