export interface FileMetadata {
  path: string;
  size: number;
  hashes: {
    'sha-512': string;
  };
}

export interface Metadata {
  name: string;
  files: FileMetadata[];
}
