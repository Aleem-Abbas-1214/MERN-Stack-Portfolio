import React from 'react';

export default function SkillBar({ skill }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between font-mono text-xs">
        <span className="text-text">{skill.name}</span>
        <span className="text-muted">{skill.proficiency}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface2">
        <div
          className="h-full rounded-full bg-amber transition-all duration-700"
          style={{ width: `${skill.proficiency}%` }}
        />
      </div>
    </div>
  );
}
