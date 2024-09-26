import { FC } from 'react';
import type { Mod as ModType } from '../../../types/entities/Mod.type';
import Mod from '../../entities/Mod';

interface ModListProps {
  mods: ModType[];
}

const ModList: FC<ModListProps> = ({ mods }) => {
  return (
    <div className="flex flex-col pt-6">
      <h4 className="text-2xl bg-blue text-white py-3 px-8 rounded-xl self-start">
        Список модов ({mods?.length})
      </h4>
      <div className="flex flex-col gap-4 pt-4">
        {mods?.map((mod) => <Mod item={mod} key={mod.id} />)}
      </div>
    </div>
  );
};

export default ModList;