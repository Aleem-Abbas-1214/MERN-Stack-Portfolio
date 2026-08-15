import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';

export default function Messages() {
  const [messages, setMessages] = useState([]);

  const load = () => api.get('/messages').then((res) => setMessages(res.data));

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    await api.patch(`/messages/${id}/read`);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await api.delete(`/messages/${id}`);
    load();
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Messages</h1>
      <p className="mt-1 font-mono text-sm text-muted">Submissions from your contact form.</p>

      <div className="mt-8 space-y-3">
        {messages.length === 0 && <p className="font-mono text-sm text-muted">No messages yet.</p>}
        {messages.map((m) => (
          <div
            key={m._id}
            className={`rounded-lg border p-5 ${
              m.read ? 'border-border bg-surface' : 'border-amber/50 bg-surface'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-sm font-semibold text-text">
                  {m.name} <span className="font-normal text-muted">— {m.email}</span>
                </p>
                {m.subject && <p className="mt-1 font-mono text-xs text-amber">{m.subject}</p>}
                <p className="mt-2 max-w-2xl text-sm text-muted">{m.message}</p>
                <p className="mt-2 font-mono text-[11px] text-muted">
                  {new Date(m.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex shrink-0 gap-3 font-mono text-xs">
                {!m.read && (
                  <button onClick={() => markRead(m._id)} className="text-amber hover:underline">
                    mark read
                  </button>
                )}
                <button onClick={() => handleDelete(m._id)} className="text-red-400 hover:underline">
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
