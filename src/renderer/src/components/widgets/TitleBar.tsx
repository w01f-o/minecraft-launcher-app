import { FC } from 'react';
import MaximizeIcon from '../shared/Icons/MaximizeIcon';
import MinimizeIcon from '../shared/Icons/MinimizeIcon';
import CloseIcon from '../shared/Icons/CloseIcon';

const TitleBar: FC = () => {
  const clickHandler = (action: 'minimize' | 'maximize' | 'close') => (): void => {
    window.electron.ipcRenderer.send('TITLE_BAR_ACTION', action);
  };

  return (
    <div className="flex justify-end w-screen h-12 pb-2">
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

export default TitleBar;
