import React from 'react';

export interface FreshLessonBannerProps {
  title: string;
  description: string;
  isNew?: boolean;
  onClick?: () => void;
}

const FreshLessonBanner: React.FC<FreshLessonBannerProps> = ({
  title,
  description,
  isNew,
  onClick,
}) => (
  <div
    className="flex items-center justify-between bg-accentGold/90 text-black rounded-2xl shadow-lg px-6 py-4 mb-6 cursor-pointer hover:bg-accentCrimson/90 transition"
    onClick={onClick}
  >
    <div>
      <div className="font-bold text-lg flex items-center gap-2">
        Today’s Fresh Lesson
        {isNew && (
          <span className="bg-accentCrimson text-white text-xs px-2 py-0.5 rounded-full ml-2">
            NEW
          </span>
        )}
      </div>
      <div className="text-sm font-semibold mt-1">{title}</div>
      <div className="text-xs text-black/80 mt-1">{description}</div>
    </div>
    <button
      className="ml-6 bg-black text-accentGold font-bold px-4 py-2 rounded-xl shadow hover:bg-accentGold hover:text-black transition"
      aria-label="Go to lesson"
    >
      Go
    </button>
  </div>
);

export default FreshLessonBanner;
