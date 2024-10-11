import { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SettingsIcon from '../shared/Icons/SettingsIcon';
import ModPackList from '../widgets/Modpacks/ModpackList';
import StartButton from '../features/StartButton';
import StasBackground from '../widgets/Background/StasBackground';
import Button from '@renderer/components/shared/UI/Button';

const Home: FC = () => {
  useEffect(() => {
    document.title = 'The Chocolate Thief';
  }, []);

  return (
    <>
      <div className="flex h-full flex-grow justify-between items-center">
        <div
          className="z-0 relative overflow-y-auto w-1/2 max-h-[70vh] scrollbar-track-transparent scrollbar-thumb-blue pr-4 custom-scrollbar"
          id="modpacks-scroll-container"
        >
          <ModPackList />
        </div>
        <div className="flex items-center gap-4 self-end z-20">
          <StartButton />
          <NavLink
            to={'/settings'}
            className="active:scale-95 animate-spin-slow"
            title={'Настройки'}
            draggable={false}
          >
            <SettingsIcon />
          </NavLink>
          <Button
            role={'primary'}
            onClick={async () => {
              const path = await window.electron.ipcRenderer.invoke('CHECK_JAVA', 'jdk-17.0.11');
              console.log(path);
            }}
          >
            Test
          </Button>
        </div>
      </div>
      <StasBackground />
    </>
  );
};

export default Home;
