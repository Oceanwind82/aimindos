import React from 'react';

export interface PathSelectorProps {
  paths: string[];
}

export const PathSelector: React.FC<PathSelectorProps> = ({ paths }) => (
  <ul className="path-selector">
    {paths.map((path) => (
      <li key={path}>{path}</li>
    ))}
  </ul>
);
