import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TerminalHero from '../components/TerminalHero';
import ProjectCard from '../components/ProjectCard';
import SkillBar from '../components/SkillBar';

const SOCIAL = {
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-username',
  email: 'you@example.com',
};

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'];

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', text: '' });

  useEffect(() => {
    Promise.all([api.get('/projects'), api.get('/skills')])
      .then(([p, s]) => {
        setProjects(p.data);
        setSkills(s.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: skills.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'sending', text: '' });
    try {
      await api.post('/messages', form);
      setStatus({ state: 'success', text: 'Message sent — thanks for reaching out. I\'ll reply soon.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        state: 'error',
        text: err.response?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-ink text-text">
      <Navbar />
      <TerminalHero />

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="$ ls ./projects" title="Selected work" />
        {loading ? (
          <p className="mt-8 font-mono text-sm text-muted">loading projects…</p>
        ) : projects.length === 0 ? (
          <p className="mt-8 font-mono text-sm text-muted">
            No projects yet — add some from the admin panel.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        )}
      </section>

      {/* Skills */}
      <section id="skills" className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading eyebrow="$ cat ./skills.json" title="Technical toolkit" />
          {grouped.length === 0 ? (
            <p className="mt-8 font-mono text-sm text-muted">
              No skills listed yet — add some from the admin panel.
            </p>
          ) : (
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {grouped.map((g) => (
                <div key={g.category}>
                  <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-amber">
                    {g.category}
                  </h3>
                  <div className="space-y-4">
                    {g.items.map((s) => (
                      <SkillBar key={s._id} skill={s} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="$ cat ./about.md" title="About me" />
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <p className="text-muted md:col-span-2">
            I'm a full stack developer focused on building reliable, well-structured
            products with the MERN stack. I care about clean APIs, sensible data
            models, and interfaces that stay out of the user's way. Recently I've been
            working on {projects.length > 0 ? projects[0].title : 'client and personal projects'},
            and I'm always looking for the next interesting problem to solve.
          </p>
          <div className="rounded-lg border border-border bg-surface p-5 font-mono text-xs text-muted">
            <p className="mb-2 text-amber">quick facts</p>
            <ul className="space-y-1.5">
              <li>role: Full Stack Developer</li>
              <li>stack: MongoDB · Express · React · Node</li>
              <li>based: Remote / Open to relocate</li>
              <li>status: Available for work</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <SectionHeading eyebrow="$ ./send-message.sh" title="Get in touch" />
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
              />
              <Field
                label="email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                required
              />
            </div>
            <Field
              label="subject"
              value={form.subject}
              onChange={(v) => setForm({ ...form, subject: v })}
            />
            <div>
              <label className="mb-1.5 block font-mono text-xs text-muted">message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded border border-border bg-surface px-3 py-2 font-mono text-sm text-text outline-none focus-visible:border-amber"
              />
            </div>
            <button
              type="submit"
              disabled={status.state === 'sending'}
              className="rounded bg-amber px-5 py-2.5 font-mono text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status.state === 'sending' ? 'sending…' : 'send message'}
            </button>
            {status.text && (
              <p
                className={`font-mono text-sm ${
                  status.state === 'success' ? 'text-green' : 'text-red-400'
                }`}
              >
                {status.text}
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer social={SOCIAL} />
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-amber">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold text-text md:text-3xl">{title}</h2>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', required = false }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs text-muted">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-border bg-surface px-3 py-2 font-mono text-sm text-text outline-none focus-visible:border-amber"
      />
    </div>
  );
}
