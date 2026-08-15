import React from 'react';

export default function Footer({ social = {} }) {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center font-mono text-xs text-muted md:flex-row md:justify-between md:text-left">
        <p>© {new Date().getFullYear()} — built with the MERN stack.</p>
        <div className="flex gap-4">
          {social.github && (
            <a href={social.github} className="hover:text-amber" target="_blank" rel="noreferrer">
              github
            </a>
          )}
          {social.linkedin && (
            <a href={social.linkedin} className="hover:text-amber" target="_blank" rel="noreferrer">
              linkedin
            </a>
          )}
          {social.email && (
            <a href={`mailto:${social.email}`} className="hover:text-amber">
              email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
