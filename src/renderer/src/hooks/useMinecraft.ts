import { ModPack } from '../types/entities/ModPack.type';
import { useAppDispatch, useAppSelector } from './redux';
import {
  setCurrentModPack as setCurrentModPackAction,
  addDownloadedModPacks as addDownloadedModPacksAction,
  removeDownloadedModPacks as removeDownloadedModPacksAction,
  setUsername as setUsernameAction,
} from '../store/reducers/minecraftSlice';

type useMinecraftReturn = {
  currentModPack: ModPack | null;
  downloadedModPacks: ModPack[];
  username: string | null;
  setCurrentModPack: (modPack: ModPack | null) => void;
  addDownloadedModPacks: (modPack: ModPack) => void;
  removeDownloadedModPacks: (modPack: ModPack) => void;
  setUsername: (username: string) => void;
};

export const useMinecraft = (): useMinecraftReturn => {
  const dispatch = useAppDispatch();
  const { currentModPack, downloadedModPacks, username } = useAppSelector(
    (state) => state.minecraft,
  );

  const setCurrentModPack = (modPack: ModPack | null): void => {
    dispatch(setCurrentModPackAction(modPack));
  };

  const addDownloadedModPacks = (modPack: ModPack): void => {
    dispatch(addDownloadedModPacksAction(modPack));
  };

  const removeDownloadedModPacks = (modPack: ModPack): void => {
    dispatch(removeDownloadedModPacksAction(modPack));
  };

  const setUsername = (username: string): void => {
    dispatch(setUsernameAction(username));
  };

  return {
    currentModPack,
    downloadedModPacks,
    setCurrentModPack,
    addDownloadedModPacks,
    removeDownloadedModPacks,
    setUsername,
    username,
  };
};
