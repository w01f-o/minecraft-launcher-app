import { ModPack } from '../types/entities/ModPack.type';
import { useAppDispatch, useAppSelector } from './redux';
import {
  setCurrentModPack as setCurrentModPackAction,
  addDownloadedModPacks as addDownloadedModPacksAction,
  removeDownloadedModPacks as removeDownloadedModPacksAction,
} from '../store/reducers/minecraftSlice';

type useMinecraftReturn = {
  currentModPack: ModPack | null;
  downloadedModPacks: ModPack[];
  setCurrentModPack: (modPack: ModPack) => void;
  addDownloadedModPacks: (modPack: ModPack) => void;
  removeDownloadedModPacks: (modPack: ModPack) => void;
};

export const useMinecraft = (): useMinecraftReturn => {
  const dispatch = useAppDispatch();
  const { currentModPack, downloadedModPacks } = useAppSelector((state) => state.minecraft);

  const setCurrentModPack = (modPack: ModPack): void => {
    dispatch(setCurrentModPackAction(modPack));
  };

  const addDownloadedModPacks = (modPack: ModPack): void => {
    dispatch(addDownloadedModPacksAction(modPack));
  };

  const removeDownloadedModPacks = (modPack: ModPack): void => {
    dispatch(removeDownloadedModPacksAction(modPack));
  };

  return {
    currentModPack,
    downloadedModPacks,
    setCurrentModPack,
    addDownloadedModPacks,
    removeDownloadedModPacks,
  };
};
