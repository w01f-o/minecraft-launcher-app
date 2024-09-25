import { FC, useMemo } from 'react';
import ModPack from '../entities/ModPack';
import { useMinecraft } from '../../hooks/useMinecraft';
import { useGetModPacksQuery } from '@renderer/services/modPacks.api';
import { MutatingDots } from 'react-loader-spinner';

const ModPackList: FC = () => {
  const { data: modPacks, isSuccess, isLoading } = useGetModPacksQuery();
  const { currentModPack } = useMinecraft();

  const sortedModPacks = useMemo(() => {
    return modPacks?.sort((a) => (a.id === currentModPack?.id ? -1 : 1));
  }, [modPacks]);

  return (
    <div className="flex flex-col gap-4 z-0">
      {isLoading && (
        <MutatingDots
          color="#85A2E8"
          wrapperClass="justify-center"
          secondaryColor="#85A2E8"
          width={100}
          height={100}
        />
      )}
      {isSuccess &&
        sortedModPacks?.map((modPack) => (
          <ModPack item={modPack} key={modPack.id} isCurrent={currentModPack?.id === modPack.id} />
        ))}
    </div>
  );
};

export default ModPackList;
