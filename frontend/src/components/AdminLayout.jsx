import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const items = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/skills', label: 'Skills' },
  { to: '/admin/messages', label: 'Messages' },
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-ink text-text">
      <div className="flex">
        <aside className="hidden w-60 shrink-0 border-r border-border bg-surface md:block">
          <div className="border-b border-border px-6 py-5">
            <p className="font-mono text-sm text-amber">~/admin</p>
            <p className="mt-1 truncate text-xs text-muted">{admin?.email}</p>
          </div>
          <nav className="flex flex-col gap-1 p-4 font-mono text-sm">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded px-3 py-2 transition-colors ${
                    isActive ? 'bg-surface2 text-amber' : 'text-muted hover:text-text'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="w-full rounded border border-border px-3 py-2 font-mono text-sm text-muted transition-colors hover:border-amber hover:text-amber"
            >
              log out
            </button>
          </div>
        </aside>

        <main className="flex-1 px-6 py-8 md:px-10">{children}</main>
      </div>
    </div>
  );
}
