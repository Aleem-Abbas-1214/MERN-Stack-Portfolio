import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0, unread: 0 });

  useEffect(() => {
    Promise.all([api.get('/projects'), api.get('/skills'), api.get('/messages')]).then(
      ([p, s, m]) => {
        setStats({
          projects: p.data.length,
          skills: s.data.length,
          messages: m.data.length,
          unread: m.data.filter((msg) => !msg.read).length,
        });
      }
    );
  }, []);

  const cards = [
    { label: 'Projects', value: stats.projects, to: '/admin/projects' },
    { label: 'Skills', value: stats.skills, to: '/admin/skills' },
    { label: 'Messages', value: stats.messages, to: '/admin/messages' },
    { label: 'Unread messages', value: stats.unread, to: '/admin/messages' },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 font-mono text-sm text-muted">Overview of your portfolio content.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-amber/60"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-amber">{c.value}</p>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
