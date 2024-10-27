import { FC, useEffect, useMemo } from 'react';
import ModPack from '../../entities/ModPack';
import { useMinecraft } from '../../../hooks/useMinecraft';
import { useGetModPacksQuery } from '@renderer/services/modPacks.api';
import ErrorMessage from '../../features/Errors/ErrorMessage';
import { animated, useTransition } from '@react-spring/web';
import type { ModPack as ModPackType } from '../../../types/entities/ModPack.type';
import DotsLoader from '@renderer/components/widgets/Loaders/DotsLoader';
import log from 'electron-log/renderer';

const gap = 20;
const cardHeight = 160;

const ModPackList: FC = () => {
  const { data: modPacks, isSuccess, isLoading, isError, error } = useGetModPacksQuery();
  const { currentModPack } = useMinecraft();

  const sortedModPacks = useMemo(() => {
    return [...(modPacks || [])].sort((a) => (a.id === currentModPack?.id ? -1 : 1));
  }, [modPacks, currentModPack]);

  let height = -gap;

  const transitions = useTransition(
    sortedModPacks.map((modpack) => ({ ...modpack, y: (height += cardHeight + gap) - cardHeight })),
    {
      key: (item: ModPackType) => item.id,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y }) => ({ y, height: cardHeight, opacity: 1 }),
      update: ({ y }) => ({ y, height: cardHeight }),
      config: { tension: 400, friction: 40 },
    },
  );

  useEffect(() => {
    isError && log.error('Error while fetching modpacks: ', error);
  }, [isError]);

  useEffect(() => {
    isSuccess && log.info('Modpacks fetched successfully: ', modPacks);
  }, [isSuccess]);

  return (
    <div
      className="z-0 relative px-2"
      style={{ height: sortedModPacks.length > 0 ? height + 20 : 'auto' }}
    >
      {isLoading && <DotsLoader color="#85A2E8" secondaryColor="#85A2E8" />}
      {isSuccess &&
        transitions((styles, modpack, _t, index) => (
          <animated.div
            style={{ zIndex: modPacks.length - index, ...styles }}
            className="absolute w-full will-change-transform"
          >
            <ModPack item={modpack} isCurrent={currentModPack?.id === modpack.id} />
          </animated.div>
        ))}
      {isError && <ErrorMessage message={JSON.stringify(error)} />}
    </div>
  );
};

export default ModPackList;
