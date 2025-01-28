import { Metadata } from './Metadata';

export interface CheckUpdateResult {
  toDelete: string[];
  downloadLink: string | null;
  serverMetadata: Metadata | null;
}
