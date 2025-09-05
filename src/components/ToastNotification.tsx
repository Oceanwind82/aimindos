import React from 'react';

export interface ToastNotificationProps {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  onClose?: () => void;
}

const typeColors = {
  success: 'bg-green-500 text-white',
  info: 'bg-accentGold text-black',
  warning: 'bg-yellow-400 text-black',
  error: 'bg-red-500 text-white',
};

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  type = 'info',
  onClose,
}) => (
  <div
    className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-xl shadow-lg font-semibold flex items-center gap-3 ${typeColors[type]}`}
    role="alert"
    aria-live="polite"
  >
    <span>{message}</span>
    {onClose && (
      <button className="ml-2 text-lg font-bold" onClick={onClose} aria-label="Close notification">
        ×
      </button>
    )}
  </div>
);

export default ToastNotification;
