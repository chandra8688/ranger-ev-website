import React from 'react';
import './TransitionTicker.css';

export default function TransitionTicker() {
  const phrases = [
    "60 kW DC FAST CHARGING",
    "CCS2",
    "24×7 ACCESS",
    "HIGHWAY NETWORK",
    "RELIABLE POWER",
    "BUILT FOR THE JOURNEY"
  ];

  const tickerBlock = phrases.map((phrase, idx) => (
    <React.Fragment key={idx}>
      <span className="ticker-phrase">{phrase}</span>
      <span className="ticker-bullet">•</span>
    </React.Fragment>
  ));

  return (
    <div className="transition-ticker" aria-hidden="true">
      <div className="transition-ticker__inner">
        <div className="ticker-segment">{tickerBlock}</div>
        <div className="ticker-segment">{tickerBlock}</div>
        <div className="ticker-segment">{tickerBlock}</div>
        <div className="ticker-segment">{tickerBlock}</div>
      </div>
    </div>
  );
}
