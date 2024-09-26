import fs from 'node:fs';
import * as unzipper from 'unzipper';

export const unzipArchive = (archivePath: string, extractTo: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(archivePath)
      .pipe(unzipper.Extract({ path: extractTo }))
      .on('close', () => {
        console.log('Extraction complete');
        resolve();
      })
      .on('error', (error: never) => {
        console.error('Error during extraction:', error);
        reject(error);
      });
  });
};
