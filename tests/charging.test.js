import { describe, it, expect } from 'vitest';
import { estimateCharge, formatDuration, vehiclePresets } from '../src/data/charging.js';

describe('estimateCharge', () => {
  const base = { batteryKwh: 45, fromPct: 20, toPct: 80, tariffPerKwh: 23 };

  it('computes energy, time and cost for a typical 20→80% stop', () => {
    const r = estimateCharge(base);
    expect(r.energyKwh).toBeCloseTo(27, 5);
    expect(r.minutes).toBe(41); // 27 kWh at ~40 kW average
    expect(r.cost).toBe(690); // 27 / 0.9 × ₹23
  });

  it('returns zeros when the target is not above the start', () => {
    expect(estimateCharge({ ...base, fromPct: 80, toPct: 80 })).toEqual({ energyKwh: 0, billedKwh: 0, minutes: 0, cost: 0 });
    expect(estimateCharge({ ...base, fromPct: 90, toPct: 50 }).cost).toBe(0);
  });

  it('rejects invalid battery sizes', () => {
    expect(estimateCharge({ ...base, batteryKwh: 'abc' }).cost).toBe(0);
    expect(estimateCharge({ ...base, batteryKwh: -10 }).cost).toBe(0);
  });

  it('clamps percentages into 0–100', () => {
    expect(estimateCharge({ ...base, fromPct: -50, toPct: 150 }).energyKwh).toBeCloseTo(45, 5);
  });

  it('has sensible vehicle presets', () => {
    vehiclePresets.forEach((v) => {
      expect(v.kwh).toBeGreaterThan(20);
      expect(v.kwh).toBeLessThan(120);
    });
  });
});

describe('formatDuration', () => {
  it('formats minutes and hours', () => {
    expect(formatDuration(0)).toBe('—');
    expect(formatDuration(41)).toBe('41 min');
    expect(formatDuration(75)).toBe('1 h 15 min');
  });
});
