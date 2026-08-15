import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-amber/60">
      <div className="flex items-center gap-2 border-b border-border bg-surface2 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
        <span className="ml-2 truncate font-mono text-xs text-muted">{project.slug}.jsx</span>
      </div>

      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={`${project.title} preview`}
          className="h-44 w-full border-b border-border object-cover"
          loading="lazy"
        />
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-mono text-lg font-semibold text-text">{project.title}</h3>
        <p className="text-sm text-muted">{project.description}</p>

        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-amber"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-4 pt-3 font-mono text-xs">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-amber"
            >
              source →
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-amber"
            >
              live demo →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
