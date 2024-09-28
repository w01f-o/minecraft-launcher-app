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

  const fetchMinecraftServerIp = async (): Promise<void> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/modpack/get_server_data/ip`);
    const json = await response.json();

    window.localStorage.setItem('serverIp', json.serverIp);
  };

  useEffect(() => {
    window.utils.getHwid().then((hwid) => {
      setHwid(hwid);
      window.localStorage.setItem('hwid', hwid);
    });
  }, []);

  useEffect(() => {
    fetchMinecraftServerIp();
  }, []);

  useEffect(() => {
    if (hwid) {
      const formData = new FormData();
      formData.append('hwid', hwid);
      updateCharacter(formData);
    }
  }, [hwid]);

  useEffect(() => {
    if (data && data?.username !== null) {
      setUsername(data.username);
    }
  }, [data]);

  return children;
};

export default MinecraftProvider;
