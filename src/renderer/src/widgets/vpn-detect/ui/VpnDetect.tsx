import { useNetworkState } from '@uidotdev/usehooks';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';

export const VpnDetect: FC = () => {
  const [isVpnDetect, setIsVpnDetect] = useState<boolean>(false);

  const getSimulatedLocation = async (): Promise<void> => {
    try {
      const { data } = await axios.get('https://api.ipgeolocation.io/getip');
      const { data: location } = await axios.get(
        `https://api.ipgeolocation.io/ipgeo`,
        {
          params: {
            apiKey: import.meta.env.VITE_VPN_DETECT_API_KEY,
            ip: data.ip,
          },
        }
      );

      setIsVpnDetect(
        location.time_zone.name !==
          Intl.DateTimeFormat().resolvedOptions().timeZone
      );
    } catch {
      console.log('Error');
    }
  };

  const { online } = useNetworkState();

  useEffect(() => {
    if (online) {
      getSimulatedLocation();
    }
  }, [online]);

  useEffect(() => {
    getSimulatedLocation();
  }, []);

  return (
    <div className="text-sm">
      {isVpnDetect
        ? '👽 У вас включён VPN, с ним могут возникнуть проблемы при загрузке игры'
        : ''}
    </div>
  );
};
