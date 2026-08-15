import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const links = [
  { href: '#projects', label: 'projects' },
  { href: '#skills', label: 'skills' },
  { href: '#about', label: 'about' },
  { href: '#contact', label: 'contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-ink/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight text-text">
          <span className="text-amber">~/</span>portfolio
        </a>

        <ul className="hidden gap-8 font-mono text-sm text-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-amber">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            to="/admin/login"
            className="rounded border border-border px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-amber hover:text-amber"
          >
            admin
          </Link>
        </div>

        <button
          className="text-text md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="font-mono">{open ? '✕' : '☰'}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-surface px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4 font-mono text-sm text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="hover:text-amber">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/admin/login" className="hover:text-amber">
                admin
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
