export interface MavenMetadata {
  metadata: Metadata;
}

export interface Metadata {
  groupId: string;
  artifactId: string;
  versioning: Versioning;
}

export interface Versioning {
  release: string;
  latest: string;
  lastUpdated: string;
  versions: Versions;
}

export interface Versions {
  version: string[];
}
