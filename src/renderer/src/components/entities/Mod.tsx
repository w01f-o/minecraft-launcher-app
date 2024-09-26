import { FC } from 'react';
import { Mod as ModType } from '../../types/entities/Mod.type';

interface ModProps {
  item: ModType;
}

const Mod: FC<ModProps> = ({ item }) => {
  return (
    <a
      className="w-full flex items-center gap-3 py-4 px-6 rounded-xl relative before:z-10 before:absolute before:inset-0 before:rounded-xl hover:before:bg-gray before:opacity-20 before:transition-all"
      href="https://modrinth.com/"
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex size-[60px] overflow-hidden rounded-xl relative z-20">
        <img src={`${import.meta.env.VITE_STATIC_URL}/${item.thumbnail}`} alt={item.name} />
      </div>
      <div className="text-xl relative z-20">{item.name}</div>
    </a>
  );
};

export default Mod;
