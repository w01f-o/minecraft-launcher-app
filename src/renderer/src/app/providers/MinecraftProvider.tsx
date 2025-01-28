import { FC, ReactNode, useEffect, useState } from 'react';
import { useMinecraft } from '../../hooks/useMinecraft';
import { useGetCharacterQuery } from '../../services/character.api';
import log from 'electron-log/renderer';

interface MinecraftProviderProps {
  children: ReactNode;
}

const MinecraftProvider: FC<MinecraftProviderProps> = ({ children }) => {
  const [hwid, setHwid] = useState<string | null>(null);
  const { setUsername } = useMinecraft();
  const { data } = useGetCharacterQuery(hwid!, {
    skip: hwid === null,
  });

  useEffect(() => {
    window.utils.getHwid().then(hwid => {
      setHwid(hwid);
      window.localStorage.setItem('hwid', hwid);
    });
  }, []);

  useEffect(() => {
    if (data && data?.username !== null) {
      const { username } = data;

      setUsername(username);
      log.debug('Username set to:', username);
    }
  }, [data]);

  return children;
};

export default MinecraftProvider;
