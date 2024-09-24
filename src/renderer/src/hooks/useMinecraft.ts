import { ModPack } from '../types/ModPack.type';
import { useAppDispatch, useAppSelector } from './redux';
import { setCurrentModPack as setCurrentModPackAction } from '../store/reducers/minecraftSlice';

type useMinecraftReturn = {
  currentModPack: ModPack | null;
  setCurrentModPack: (modPack: ModPack) => void;
};

export const useMinecraft = (): useMinecraftReturn => {
  const dispatch = useAppDispatch();
  const { currentModPack } = useAppSelector((state) => state.minecraft);

  const setCurrentModPack = (modPack: ModPack): void => {
    dispatch(setCurrentModPackAction(modPack));
  };

  return {
    currentModPack,
    setCurrentModPack,
  };
};
