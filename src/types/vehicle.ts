export type VehicleType =
  | "passenger"
  | "minibus"
  | "light-truck"
  | "commercial";

export interface VehicleInfo {
  type?: VehicleType;
  brand: string;
  model: string;
  year?: number | null;
  plate?: string;
  vin?: string;
}

export const VEHICLE_TYPE_OPTIONS: { label: string; value: VehicleType }[] = [
  { label: "Легковой автомобиль", value: "passenger" },
  { label: "Микроавтобус", value: "minibus" },
  { label: "Малый грузовик", value: "light-truck" },
  { label: "Коммерческий автомобиль", value: "commercial" }
];
