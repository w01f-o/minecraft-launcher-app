import { FC, ReactNode, useEffect, useState } from 'react';
import { useMinecraft } from '../../hooks/useMinecraft';
import { useGetCharacterQuery, useUpdateCharacterMutation } from '../../services/character.api';

interface MinecraftProviderProps {
  children: ReactNode;
}

const MinecraftProvider: FC<MinecraftProviderProps> = ({ children }) => {
  const [hwid, setHwid] = useState<string | null>(null);
  const { setUsername } = useMinecraft();
  const { data } = useGetCharacterQuery(hwid ?? '');
  const [updateCharacter] = useUpdateCharacterMutation();

  useEffect(() => {
    window.utils.getHwid().then((hwid) => {
      setHwid(hwid);
      window.localStorage.setItem('hwid', hwid);
    });
  }, []);

  useEffect(() => {
    if (hwid) {
      const formData = new FormData();
      formData.append('hwid', hwid);
      updateCharacter(formData);
    }
  }, [hwid]);

  useEffect(() => {
    if (data) {
      setUsername(data.username);
    }
  }, [data]);

  return children;
};

export default MinecraftProvider;
