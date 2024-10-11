import extract from 'extract-zip';

export const unzipArchive = async (archivePath: string, extractTo: string): Promise<void> => {
  await extract(archivePath, { dir: extractTo });
};
