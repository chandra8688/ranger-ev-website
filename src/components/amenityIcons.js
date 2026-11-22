import { Coffee, Wifi, SquareParking, Toilet, UtensilsCrossed, Sofa } from 'lucide-react';

export const AMENITY_ICONS = {
  parking: SquareParking,
  food: Coffee,
  breakfast: UtensilsCrossed,
  wifi: Wifi,
  toilets: Toilet,
  rest_area: Sofa,
};

export const amenityIcon = (id) => AMENITY_ICONS[id] ?? Coffee;
