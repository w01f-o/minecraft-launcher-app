import { useAppDispatch, useAppSelector } from './redux';
import {
  toggleDebugMode as toggleDebugModeAction,
  toggleAutoLogin as toggleAutoLoginAction,
  toggleFullscreen as toggleFullscreenAction,
  setMaxRam as setMaxRamAction,
} from '../store/reducers/settingsSlice';

type useSettingReturn = {
  isDebugMode: boolean;
  isFullscreen: boolean;
  isAutoLogin: boolean;
  maxRam: number | null;
  toggleDebugMode: () => void;
  toggleFullScreen: () => void;
  toggleAutoLogin: () => void;
  setMaxRam: (value: number) => void;
};

export const useSettings = (): useSettingReturn => {
  const dispatch = useAppDispatch();
  const { isDebugMode, isAutoLogin, isFullscreen, maxRam } = useAppSelector(
    (state) => state.settings,
  );

  const toggleDebugMode = (): void => {
    dispatch(toggleDebugModeAction());
  };

  const toggleFullScreen = (): void => {
    dispatch(toggleFullscreenAction());
  };

  const toggleAutoLogin = (): void => {
    dispatch(toggleAutoLoginAction());
  };

  const setMaxRam = (value: number): void => {
    dispatch(setMaxRamAction(value));
  };

  return {
    isDebugMode,
    isAutoLogin,
    isFullscreen,
    maxRam,
    toggleAutoLogin,
    toggleDebugMode,
    toggleFullScreen,
    setMaxRam,
  };
};
