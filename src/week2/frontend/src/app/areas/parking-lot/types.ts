/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type ParkingLotItem = {
  id: string;
  title: string;
  description: string;
  created: string;
};

export type ParkingLotDetailItem = ParkingLotItem & {
  notes: { id: string; content: string; added: string }[];
};
