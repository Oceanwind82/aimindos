import React from 'react';

export interface ProgressReportProps {
  masteredSkills: string[];
  streak: number;
  nextUnlock?: string;
}

const ProgressReport: React.FC<ProgressReportProps> = ({ masteredSkills, streak, nextUnlock }) => (
  <div className="bg-white/80 rounded-2xl shadow p-6 mb-6 max-w-xl mx-auto text-center">
    <h3 className="text-lg font-bold text-accentGold mb-2">Your Progress</h3>
    <div className="mb-2 text-neutralSilver">
      <span className="font-semibold">Streak:</span> {streak} days
    </div>
    <div className="mb-2">
      <span className="font-semibold">Mastered Skills:</span>
      <ul className="inline-block ml-2">
        {masteredSkills.map((skill) => (
          <li
            key={skill}
            className="inline-block bg-accentGold/20 text-accentGold rounded px-2 py-1 mx-1 text-xs font-semibold"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
    {nextUnlock && (
      <div className="mt-2 text-accentCrimson font-semibold">
        Next unlock: <span className="underline">{nextUnlock}</span>
      </div>
    )}
  </div>
);

export default ProgressReport;
