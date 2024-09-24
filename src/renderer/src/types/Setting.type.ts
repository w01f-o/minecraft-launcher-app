export interface Setting {
  id: number;
  name: string;
  description: string;
  defaultValue: boolean;
  action: () => void;
}
