import React, { useId, useMemo, useState } from 'react';
import { vehiclePresets, estimateCharge, formatDuration, ESTIMATE_ASSUMPTIONS } from '../data/charging';

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

export default function ChargeCalculator({ tariffPerKwh = 23 }) {
  const id = useId();
  const [vehicle, setVehicle] = useState('nexon');
  const [custom, setCustom] = useState(45);
  const [from, setFrom] = useState(20);
  const [to, setTo] = useState(80);

  const batteryKwh = vehicle === 'custom' ? Number(custom) : vehiclePresets.find((v) => v.id === vehicle)?.kwh;
  const result = useMemo(
    () => estimateCharge({ batteryKwh, fromPct: from, toPct: to, tariffPerKwh }),
    [batteryKwh, from, to, tariffPerKwh],
  );

  const onFrom = (v) => { const n = Number(v); setFrom(n); if (n >= to) setTo(Math.min(100, n + 5)); };
  const onTo = (v) => { const n = Number(v); setTo(n); if (n <= from) setFrom(Math.max(0, n - 5)); };

  return (
    <div className="card calc">
      <form className="calc__fields" onSubmit={(e) => e.preventDefault()} aria-label="Charging estimate inputs">
        <div className="field">
          <label htmlFor={`${id}-car`}>Your car</label>
          <select id={`${id}-car`} className="select" value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
            {vehiclePresets.map((v) => (
              <option key={v.id} value={v.id}>{v.name} — approx. {v.kwh} kWh</option>
            ))}
            <option value="custom">Other / enter battery size</option>
          </select>
        </div>

        {vehicle === 'custom' && (
          <div className="field">
            <label htmlFor={`${id}-kwh`}>Battery size (kWh)</label>
            <input
              id={`${id}-kwh`}
              className="input"
              type="number"
              inputMode="decimal"
              min="10"
              max="150"
              step="0.1"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
            />
          </div>
        )}

        <div className="field">
          <div className="range-row">
            <label htmlFor={`${id}-from`}>Arrive with</label>
            <output htmlFor={`${id}-from`}>{from}%</output>
          </div>
          <input id={`${id}-from`} type="range" min="0" max="95" step="5" value={from} onChange={(e) => onFrom(e.target.value)} />
        </div>

        <div className="field">
          <div className="range-row">
            <label htmlFor={`${id}-to`}>Charge to</label>
            <output htmlFor={`${id}-to`}>{to}%</output>
          </div>
          <input id={`${id}-to`} type="range" min="5" max="100" step="5" value={to} onChange={(e) => onTo(e.target.value)} />
        </div>
      </form>

      <div className="calc__results" aria-live="polite">
        <div className="calc__result">
          <p className="calc__result-label">Estimated time</p>
          <p className="calc__result-value">{formatDuration(result.minutes)}</p>
        </div>
        <div className="calc__result">
          <p className="calc__result-label">Estimated cost</p>
          <p className="calc__result-value">{result.cost ? inr.format(result.cost) : '—'}</p>
        </div>
        <p className="xsmall muted">
          Estimate only. Assumes an average of ~{ESTIMATE_ASSUMPTIONS.averagePowerKw} kW and about {Math.round((1 - ESTIMATE_ASSUMPTIONS.chargingEfficiency) * 100)}% charging losses at ₹{tariffPerKwh}/kWh.
          Real speed depends on your car, battery temperature and how full the battery is — charging slows above ~80%.
        </p>
      </div>
    </div>
  );
}
