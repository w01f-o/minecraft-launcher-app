import { FC, useEffect, useMemo } from 'react';
import type { ModPack as ModPackType } from '../../types/ModPack.type';
import ModPack from '../entities/ModPack';
import rectangle from '../../../../../resources/Прямоугольник 3.png';
import screenshot from '../../../../../resources/minecraft-screenshot.webp';
import { useMinecraft } from '../../hooks/useMinecraft';

const ModPackList: FC = () => {
  const modPacks: ModPackType[] = [
    {
      id: '1',
      name: 'Mod Pack 1',
      mods: [],
      description: 'Description of Mod Pack 1Description of Mod Pack 4Description of Mod Pack 4',
      thumbnail: rectangle,
      version: '1.14',
      screenshots: [screenshot, screenshot, screenshot],
      isDownloaded: true,
    },
    {
      id: '2',
      name: 'Mod Pack 2',
      mods: [],
      description: 'Description of Mod Pack 2Description of Mod Pack 4Description of Mod Pack 4',
      thumbnail: rectangle,
      version: '1.20.1',
      screenshots: [screenshot, screenshot, screenshot],
      isDownloaded: true,
    },
    {
      id: '3',
      name: 'Mod Pack 3',
      mods: [],
      description: 'Description of Mod Pack 3Description of Mod Pack 4Description of Mod Pack 4',
      thumbnail: rectangle,
      version: '1.20.1',
      screenshots: [screenshot, screenshot, screenshot],
      isDownloaded: false,
    },
    {
      id: '4',
      name: 'Mod Pack 4',
      mods: [],
      description: 'Description of Mod Pack 4Description of Mod Pack 4Description of Mod Pack 4',
      thumbnail: rectangle,
      version: '1.20.1',
      screenshots: [screenshot, screenshot, screenshot],
      isDownloaded: false,
    },
    {
      id: '5',
      name: 'Mod Pack 54',
      mods: [],
      description: 'Description of Mod Pack 5Description of Mod Pack 5Description of Mod Pack 5',
      thumbnail: rectangle,
      version: '1.20.1',
      screenshots: [screenshot, screenshot, screenshot],
      isDownloaded: false,
    },
  ];

  const { currentModPack, setCurrentModPack } = useMinecraft();

  useEffect(() => {
    if (currentModPack === null) {
      setCurrentModPack(modPacks[0]);
    }
  }, []);

  const sortedModPacks = useMemo(() => {
    return modPacks.sort((a) => (a.id === currentModPack?.id ? -1 : 1));
  }, []);

  return (
    <div className="flex flex-col gap-4 z-0">
      {sortedModPacks.map((modPack) => (
        <ModPack item={modPack} key={modPack.id} isCurrent={currentModPack?.id === modPack.id} />
      ))}
    </div>
  );
};

export default ModPackList;
