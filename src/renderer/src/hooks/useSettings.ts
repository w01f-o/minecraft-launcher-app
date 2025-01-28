import { useAppDispatch, useAppSelector } from './redux';
import {
  setMaxRamAction,
  toggleAutoLoginAction,
  toggleDebugModeAction,
  toggleFullscreenAction,
  toggleLauncherHideAction,
} from '../store/reducers/settingsSlice';

type useSettingReturn = {
  isDebugMode: boolean;
  isFullscreen: boolean;
  isAutoLogin: boolean;
  isLauncherHide: boolean;
  maxRam: number | null;
  toggleDebugMode: () => void;
  toggleFullScreen: () => void;
  toggleAutoLogin: () => void;
  toggleLauncherHide: () => void;
  setMaxRam: (value: number) => void;
};

export const useSettings = (): useSettingReturn => {
  const dispatch = useAppDispatch();
  const { isDebugMode, isAutoLogin, isFullscreen, maxRam, isLauncherHide } =
    useAppSelector(state => state.settings);

  const toggleDebugMode = (): void => {
    dispatch(toggleDebugModeAction());
  };

  const toggleFullScreen = (): void => {
    dispatch(toggleFullscreenAction());
  };

  const toggleAutoLogin = (): void => {
    dispatch(toggleAutoLoginAction());
  };

  const toggleLauncherHide = (): void => {
    dispatch(toggleLauncherHideAction());
  };

  const setMaxRam = (value: number): void => {
    dispatch(setMaxRamAction(value));
  };

  return {
    isDebugMode,
    isAutoLogin,
    isFullscreen,
    isLauncherHide,
    maxRam,
    toggleAutoLogin,
    toggleDebugMode,
    toggleFullScreen,
    toggleLauncherHide,
    setMaxRam,
  };
};
