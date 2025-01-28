export interface Settings {
  id: number;
  name: string;
  description: string;
  value: boolean;
  action: () => void;
}
