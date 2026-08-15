import React, { useEffect, useState } from 'react';

const LINES = [
  { prompt: '$ whoami', output: 'Alex Rivera — Full Stack Developer (MERN)' },
  { prompt: '$ cat focus.txt', output: 'React · Node.js · Express · MongoDB · REST APIs' },
  { prompt: '$ status --current', output: 'Open to new opportunities and freelance work' },
];

export default function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (visibleLines >= LINES.length) return;
    const current = LINES[visibleLines].prompt + LINES[visibleLines].output;
    if (charCount < current.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setVisibleLines((v) => v + 1);
      setCharCount(0);
    }, 350);
    return () => clearTimeout(t);
  }, [charCount, visibleLines]);

  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 font-mono text-sm text-amber">hello world, I build for the web</p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-text md:text-5xl">
            I turn ideas into
            <span className="text-amber"> working software.</span>
          </h1>
          <p className="mt-5 max-w-md text-muted">
            Full stack developer specializing in the MERN stack — MongoDB, Express,
            React, and Node.js. I design, build, and ship complete products, from
            database schema to deployed UI.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded bg-amber px-5 py-2.5 font-mono text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              view projects
            </a>
            <a
              href="#contact"
              className="rounded border border-border px-5 py-2.5 font-mono text-sm text-text transition-colors hover:border-amber hover:text-amber"
            >
              get in touch
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-glow">
          <div className="flex items-center gap-2 border-b border-border bg-surface2 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
            <span className="ml-3 font-mono text-xs text-muted">bash — 80x24</span>
          </div>
          <div className="min-h-[220px] p-5 font-mono text-sm">
            {LINES.slice(0, visibleLines).map((l, i) => (
              <div key={i} className="mb-3">
                <p className="text-green">{l.prompt}</p>
                <p className="text-muted">{l.output}</p>
              </div>
            ))}
            {visibleLines < LINES.length && (
              <div>
                <p className="text-green">
                  {LINES[visibleLines].prompt.slice(
                    0,
                    Math.min(charCount, LINES[visibleLines].prompt.length)
                  )}
                  {charCount <= LINES[visibleLines].prompt.length && (
                    <span className="terminal-caret" />
                  )}
                </p>
                {charCount > LINES[visibleLines].prompt.length && (
                  <p className="text-muted">
                    {LINES[visibleLines].output.slice(
                      0,
                      charCount - LINES[visibleLines].prompt.length
                    )}
                    <span className="terminal-caret" />
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
