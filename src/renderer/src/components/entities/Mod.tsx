import { FC } from 'react';
import { Mod as ModType } from '../../types/Mod.type';

interface ModProps {
  item: ModType;
}

const Mod: FC<ModProps> = ({ item }) => {
  return <div>{item.name}</div>;
};

export default Mod;
