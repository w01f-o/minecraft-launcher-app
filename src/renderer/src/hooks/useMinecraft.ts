import { ModPack } from '../types/entities/ModPack.type';
import { useAppDispatch, useAppSelector } from './redux';
import {
  addDownloadedModPacksAction,
  removeDownloadedModPacksAction,
  setCurrentModPackAction,
  setIsDownloadingAction,
  setUsernameAction,
} from '../store/reducers/minecraftSlice';

type useMinecraftReturn = {
  currentModPack: ModPack | null;
  downloadedModPacks: ModPack[];
  username: string | null;
  setCurrentModPack: (modPack: ModPack | null) => void;
  addDownloadedModPacks: (modPack: ModPack) => void;
  removeDownloadedModPacks: (modPack: ModPack) => void;
  setUsername: (username: string) => void;
  isDownloading: boolean;
  setIsDownloading: (isDownloading: boolean) => void;
};

export const useMinecraft = (): useMinecraftReturn => {
  const dispatch = useAppDispatch();
  const { currentModPack, downloadedModPacks, username, isDownloading } = useAppSelector(
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

  const setIsDownloading = (isDownloading: boolean): void => {
    dispatch(setIsDownloadingAction(isDownloading));
  };

  return {
    currentModPack,
    downloadedModPacks,
    setCurrentModPack,
    addDownloadedModPacks,
    removeDownloadedModPacks,
    setUsername,
    username,
    isDownloading,
    setIsDownloading,
  };
};
