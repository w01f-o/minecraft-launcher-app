import {
  addDownloadedModPacksAction,
  removeDownloadedModPacksAction,
  setCurrentModPackAction,
  setUsernameAction,
} from '@/renderer/app/stores/reducers/minecraftSlice';
import { useAppDispatch, useAppSelector } from './redux';

type useMinecraftReturn = {
  modpacks: {
    download: {
      list: string[];
      add: (modpackId: string) => void;
      remove: (modpackId: string) => void;
    };
    current: string | null;
    setCurrent: (modpackId: string | null) => void;
  };
  user: {
    name: string | null;
    setName: (username: string) => void;
  };
};

export const useMinecraft = (): useMinecraftReturn => {
  const dispatch = useAppDispatch();
  const { currentModpack, downloadedModpacks, username } = useAppSelector(
    state => state.minecraft
  );

  const setCurrentModpack = (modpackId: string | null): void => {
    dispatch(setCurrentModPackAction(modpackId));
  };

  const addDownloadedModpacks = (modpackId: string): void => {
    dispatch(addDownloadedModPacksAction(modpackId));
  };

  const removeDownloadedModpacks = (modpackId: string): void => {
    dispatch(removeDownloadedModPacksAction(modpackId));
  };

  const setUsername = (username: string): void => {
    dispatch(setUsernameAction(username));
  };

  return {
    user: {
      name: username,
      setName: setUsername,
    },
    modpacks: {
      current: currentModpack,
      setCurrent: setCurrentModpack,
      download: {
        list: downloadedModpacks,
        add: addDownloadedModpacks,
        remove: removeDownloadedModpacks,
      },
    },
  };
};
