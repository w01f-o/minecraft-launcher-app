import { Mod } from '@/renderer/entities/modpack';
import { FC } from 'react';
import { ModItem } from './ModItem';

interface ModListProps {
  mods: Mod[];
}

export const ModList: FC<ModListProps> = ({ mods }) => {
  if (!mods.length) {
    return null;
  }

  return (
    <div className="flex flex-col pt-6">
      <div className="flex items-end gap-2">
        <h4 className="text-2xl bg-blue text-white py-3 px-8 rounded-xl self-start">
          Список модов ({mods?.length})
        </h4>
        <div className="text-md">*Может содержать неточности</div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        {mods?.map(mod => <ModItem item={mod} key={mod.id} />)}
      </div>
    </div>
  );
};
