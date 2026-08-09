export const outletsData = [
  {
    id: "outlet-01",
    outletNumber: "01",
    title: "RANGER Outlet #01",
    subTitle: "Ayyasagar – Srisailam Highway (NH 765)",
    highway: "NH 765 (Srisailam Highway)",
    locationArea: "Ramnunthala, Amangal, Rangareddy",
    state: "Telangana – 509358",
    fullAddress: "Ramnunthala, Amangal, Rangareddy, Telangana – 509358",
    landmark: "Ayyasagar Temple",
    openedDate: "2 August 2026",
    status: "Operating 24/7",
    isOperational: true,
    
    coordinates: {
      lat: 16.9083245,
      lng: 78.5285002
    },
    googleMapsUrl: "https://maps.google.com?q=16.9083245,78.5285002",
    
    specs: {
      chargersCount: 2,
      chargerModel: "RANGER 60 kW DC Fast Charger",
      powerPerCharger: "60 kW",
      connectorType: "CCS2",
      gunsPerCharger: 2,
      totalChargingPoints: 4,
      maxSimultaneousEVs: 4,
      tariff: "₹23/kWh",
      operatingHours: "Open 24×7"
    },
    
    amenities: [
      { id: "parking", name: "Parking" },
      { id: "food", name: "Café / Food & Refreshments" },
      { id: "breakfast", name: "Breakfast" },
      { id: "wifi", name: "Free Wi-Fi" },
      { id: "toilets", name: "Toilets" },
      { id: "rest_area", name: "Waiting & Rest Area" }
    ],
    
    contacts: {
      primaryPhone: "+916301858198",
      displayPhone: "+91 6301858198",
      whatsappNumber: "+919491340720",
      displayWhatsapp: "+91 9491340720"
    },
    
    images: {
      hero: "/images/outlets/outlet-01-night-totem.jpeg",
      totemGraphic: "/images/outlets/outlet-01-totem-design.jpeg",
      chargerUnit: "/images/chargers/ranger-60kw-dc-charger.jpeg"
    }
  }
];
