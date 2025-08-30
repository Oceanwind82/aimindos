import React from 'react';

export interface PathSelectorProps {
  paths: string[];
}

export const PathSelector: React.FC<PathSelectorProps> = ({ paths }) => (
  <div>
    <h3>Select a Path:</h3>
    <ul className="path-selector">
      {paths.map((path) => (
        <li key={path}>{path}</li>
      ))}
    </ul>
  </div>
);
