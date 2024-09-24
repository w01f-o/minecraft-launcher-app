export interface Setting {
  id: number;
  name: string;
  description: string;
  value: boolean;
  action: () => void;
}
