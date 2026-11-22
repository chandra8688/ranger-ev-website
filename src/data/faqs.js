/** FAQ content — only facts that are confirmed in outlets.js / chargers.js. */
export const outletFaqs = (outlet) => [
  {
    q: 'Which cars can charge at RANGER?',
    a: `Any electric car with a ${outlet.specs.connectorType} DC fast-charging port — that includes most EVs sold in India, such as the Tata Nexon EV, MG ZS EV, Mahindra XUV400 and Hyundai Creta Electric. Check your owner’s manual if you are unsure.`,
  },
  {
    q: 'How much does charging cost?',
    a: `${outlet.specs.tariff} at ${outlet.title}. You pay for the energy delivered. Use the estimator on our Chargers page to see an approximate cost for your car.`,
  },
  {
    q: 'How long will it take?',
    a: `Each ${outlet.specs.powerPerCharger} DC charger typically takes a mid-size EV from 20% to 80% in roughly 40–60 minutes. The exact time depends on your car’s maximum charging speed and battery temperature.`,
  },
  {
    q: 'Is the outlet really open 24×7?',
    a: `Yes. ${outlet.title} is open 24 hours a day, 7 days a week, and our support line is staffed around the clock.`,
  },
  {
    q: 'What can I do while my car charges?',
    a: `The outlet has ${outlet.amenities.map((a) => a.name.toLowerCase()).join(', ')}.`,
  },
  {
    q: 'What if a charger is busy or not working?',
    a: `There are ${outlet.specs.totalChargingPoints} charging points across ${outlet.specs.chargersCount} chargers. If you need help on site, call or WhatsApp our 24×7 support team and we will assist you.`,
  },
];
