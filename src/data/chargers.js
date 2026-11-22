export const chargerDetails = {
  name: 'RANGER 60 kW DC Fast Charger',
  brand: 'RANGER',
  type: 'DC Fast Charger',
  powerOutput: '60 kW DC',
  connectorStandard: 'CCS2 (Combined Charging System, Type 2)',
  gunsCount: 2,
  simultaneousCharging: '2 EVs per unit',
  brandingNote: 'Custom RANGER-branded hardware with Make in India branding',

  confirmedFeatures: [
    { title: '60 kW DC Output', description: 'DC fast charging that feeds the battery directly, bypassing the car’s slower on-board AC charger.' },
    { title: 'CCS2 Standard', description: 'The connector standard used by most electric cars sold in India.' },
    { title: 'Dual Charging Guns', description: 'Two CCS2 guns on every unit.' },
    { title: '2 EVs Per Unit', description: 'Each charger can serve two vehicles at the same time.' },
  ],

  /** Rows for the technical specification table. Only confirmed facts. */
  specTable: [
    ['Charger type', 'DC fast charger'],
    ['Rated output', '60 kW DC'],
    ['Connector standard', 'CCS2'],
    ['Charging guns per unit', '2'],
    ['Vehicles per unit', '2 simultaneously'],
    ['Units at Outlet #01', '2 (4 charging points)'],
    ['Tariff at Outlet #01', '₹23 per kWh'],
    ['Availability', '24×7'],
    ['Branding', 'RANGER, Make in India'],
  ],

  /** Popular CCS2 cars in India — illustrative, not exhaustive. */
  compatibleExamples: [
    'Tata Nexon EV', 'Tata Punch EV', 'Tata Curvv EV', 'MG ZS EV', 'MG Windsor EV',
    'Mahindra XUV400', 'Mahindra BE 6', 'Hyundai Creta Electric', 'BYD Atto 3', 'Kia EV6',
  ],
};
