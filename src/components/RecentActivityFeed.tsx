import React from 'react';

export interface ActivityItem {
  user: string;
  action: string;
  time: string;
  avatarUrl?: string;
}

export interface RecentActivityFeedProps {
  items: ActivityItem[];
}

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ items }) => (
  <div className="bg-white/80 rounded-2xl shadow p-6 mb-6 max-w-xs mx-auto">
    <h3 className="text-lg font-bold text-accentGold mb-4 text-center">Recent Activity</h3>
    <ul>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2 mb-3 text-sm">
          {item.avatarUrl && (
            <img src={item.avatarUrl} alt={item.user} className="w-6 h-6 rounded-full border" />
          )}
          <span className="font-semibold">{item.user}</span>
          <span className="text-neutralSilver">{item.action}</span>
          <span className="ml-auto text-xs text-gray-400">{item.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentActivityFeed;
