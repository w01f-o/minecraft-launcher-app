import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { LaunchConfig } from 'tomate-loaders';
import path from 'node:path';
import * as fs from 'fs/promises';

const getMavenMetadata = async (): Promise<any> => {
  const metadataUrl =
    'https://maven.minecraftforge.net/net/minecraftforge/forge/maven-metadata.xml';
  const response = await axios.get(metadataUrl);

  return await parseStringPromise(response.data);
};

const downloadForge = async (rootPath: string, gameVersion: string): Promise<any> => {
  // const { metadata } = await getMavenMetadata();
  //
  // const versions = metadata.versioning[0].versions[0].version;
  // const filteredVersions = versions.filter((version: string): boolean =>
  //   version.includes(gameVersion + '-'),
  // );
  // const latestVersion = filteredVersions[0];
  //
  // const minor = latestVersion.split('.')[1];
  // let releaseType: string;
  // if (minor && parseInt(minor) <= 12 && latestVersion !== '1.12.2') {
  //   releaseType = 'universal';
  // } else {
  //   releaseType = 'installer';
  // }
  //
  // const downloadLink = `https://maven.minecraftforge.net/net/minecraftforge/forge/${latestVersion}/forge-${latestVersion}-${releaseType}.jar`;

  const forgeFilePath = path.join(
    rootPath,
    'versions',
    `1.7.10-Forge10.13.4.1614-1.7.10`,
    `1.7.10-Forge10.13.4.1614-1.7.10.jar`,
  );

  // await fs.mkdir(path.dirname(forgeFilePath), { recursive: true });
  //
  // const forgeResponse = await axios.get(downloadLink, {
  //   responseType: 'arraybuffer',
  // });
  // const buffer = Buffer.from(forgeResponse.data);
  //
  // await fs.writeFile(forgeFilePath, buffer);

  return forgeFilePath;
};

export const getForgeConfig = async (
  config: LaunchConfig,
): Promise<{
  root: string;
  clientPackage: null;
  version: { number: string; type: string };
  forge: string;
}> => {
  const { gameVersion, rootPath } = config;

  const forgeFilePath = await downloadForge(rootPath, gameVersion);

  return {
    root: rootPath,
    clientPackage: null,
    version: {
      number: '1.7.10-Forge10.13.4.1614-1.7.10',
      type: 'release',
    },
    // forge: forgeFilePath,
  };
};
