import { MainEvents } from '@/renderer/shared/model';
import { CloseIcon, MaximizeIcon, MinimizeIcon } from '@/renderer/shared/ui';
import { FC } from 'react';

export const TitleBar: FC = () => {
  const clickHandler =
    (action: 'minimize' | 'maximize' | 'close') => (): void => {
      window.electron.ipcRenderer.send(MainEvents.TITLE_BAR_ACTION, action);
    };

  return (
    <div className="flex justify-end w-screen h-10 z-50">
      <div id="drag-region" className="flex-grow"></div>
      <div className="flex">
        <button
          className="w-16 h-full hover:bg-blue_light transition grid place-items-center"
          onClick={clickHandler('minimize')}
        >
          <MinimizeIcon />
        </button>
        <button
          className="w-16 h-full hover:bg-blue_light transition grid place-items-center"
          onClick={clickHandler('maximize')}
        >
          <MaximizeIcon />
        </button>
        <button
          className="w-16 h-full hover:bg-red-400 transition grid place-items-center"
          onClick={clickHandler('close')}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
