import { Modpack, useGetModPacksQuery } from '@/renderer/entities/modpack';
import { useMinecraft } from '@/renderer/shared/lib';
import { DotsLoader, ErrorMessage } from '@/renderer/shared/ui';
import { animated, useTransition } from '@react-spring/web';
import log from 'electron-log/renderer';
import { FC, useEffect, useMemo } from 'react';
import { ModpackItem } from './ModpackItem';

const gap = 20;
const cardHeight = 160;

export const ModPackList: FC = () => {
  const {
    data: modPacks,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetModPacksQuery();
  const {
    modpacks: { current },
  } = useMinecraft();

  const sortedModPacks = useMemo(() => {
    return [...(modPacks || [])].sort(a => (a.id === current ? -1 : 1));
  }, [modPacks, current]);

  let height = -gap;

  const transitions = useTransition(
    sortedModPacks.map(modpack => ({
      ...modpack,
      y: (height += cardHeight + gap) - cardHeight,
    })),
    {
      key: (item: Modpack) => item.id,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y }) => ({ y, height: cardHeight, opacity: 1 }),
      update: ({ y }) => ({ y, height: cardHeight }),
      config: { tension: 400, friction: 40 },
    }
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
            <ModpackItem item={modpack} isCurrent={current === modpack.id} />
          </animated.div>
        ))}
      {isError && <ErrorMessage message={JSON.stringify(error)} />}
    </div>
  );
};
