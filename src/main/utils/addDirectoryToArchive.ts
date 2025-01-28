import JSZip from 'jszip';
import * as fs from 'node:fs';
import * as path from 'node:path';

export const addDirectoryToArchive = (
  zip: JSZip,
  folderPath: string,
  zipFolderPath: string
): void => {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    const fileStats = fs.statSync(fullPath);

    if (fileStats.isDirectory()) {
      addDirectoryToArchive(zip, fullPath, `${zipFolderPath}/${file}`);
    } else {
      const fileData = fs.readFileSync(fullPath);
      zip.file(`${zipFolderPath}/${file}`, fileData);
    }
  }
};
