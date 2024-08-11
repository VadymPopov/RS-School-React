export type StarShip = {
  name: string;
  model: string;
  manufacturer: string;
  url: string;
};

export type StarShipDetails = {
  name: string;
  model: string;
  manufacturer: string;
  passengers: string;
  created: string;
  max_atmosphering_speed: string;
  cost_in_credits: string;
  crew: string;
  length: string;
};

export type StarShipsData = {
  count: number;
  results: StarShip[];
};
