/**
 * Charging time & cost estimator.
 * Deliberately simple and transparent — every assumption is shown on the page.
 */

/** Approximate usable battery sizes (kWh). Variants differ; users can pick "Custom". */
export const vehiclePresets = [
  { id: 'punch', name: 'Tata Punch EV (long range)', kwh: 35 },
  { id: 'windsor', name: 'MG Windsor EV', kwh: 38 },
  { id: 'xuv400', name: 'Mahindra XUV400', kwh: 39.4 },
  { id: 'nexon', name: 'Tata Nexon EV (long range)', kwh: 45 },
  { id: 'zs', name: 'MG ZS EV', kwh: 50.3 },
  { id: 'creta', name: 'Hyundai Creta Electric (long range)', kwh: 51.4 },
  { id: 'atto3', name: 'BYD Atto 3', kwh: 60.5 },
];

export const ESTIMATE_ASSUMPTIONS = {
  averagePowerKw: 40, // typical average on a 60 kW unit between 20% and 80%
  chargingEfficiency: 0.9, // energy billed at the charger vs. energy stored
};

/**
 * @returns {{ energyKwh: number, billedKwh: number, minutes: number, cost: number }}
 */
export function estimateCharge({ batteryKwh, fromPct, toPct, tariffPerKwh, assumptions = ESTIMATE_ASSUMPTIONS }) {
  const battery = Number(batteryKwh);
  const from = Math.min(Math.max(Number(fromPct), 0), 100);
  const to = Math.min(Math.max(Number(toPct), 0), 100);
  if (!Number.isFinite(battery) || battery <= 0 || to <= from) {
    return { energyKwh: 0, billedKwh: 0, minutes: 0, cost: 0 };
  }
  const energyKwh = (battery * (to - from)) / 100;
  const billedKwh = energyKwh / assumptions.chargingEfficiency;
  const minutes = Math.round((energyKwh / assumptions.averagePowerKw) * 60);
  const cost = Math.round(billedKwh * tariffPerKwh);
  return { energyKwh, billedKwh, minutes, cost };
}

export function formatDuration(minutes) {
  if (minutes <= 0) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h} h ${m} min` : `${m} min`;
}
