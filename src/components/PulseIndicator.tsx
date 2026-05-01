import React from 'react';

export default function PulseIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pulse opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-pulse"></span>
      </span>
      <span className="text-xs font-medium text-brand-pulse uppercase tracking-widest">
        Live Pulse
      </span>
    </div>
  );
}
