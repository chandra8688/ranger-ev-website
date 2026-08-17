import React from 'react';
import './TransitionTicker.css';

export default function TransitionTicker() {
  const content = "60 kW DC FAST CHARGING • CCS2 • 24×7 ACCESS • HIGHWAY NETWORK • RELIABLE POWER • BUILT FOR THE JOURNEY • ";
  // Repeat content to ensure it loops smoothly
  const repeatedContent = content.repeat(4);

  return (
    <div className="transition-ticker" aria-hidden="true">
      <div className="transition-ticker__inner">
        <span className="transition-ticker__text">{repeatedContent}</span>
        <span className="transition-ticker__text">{repeatedContent}</span>
      </div>
    </div>
  );
}
