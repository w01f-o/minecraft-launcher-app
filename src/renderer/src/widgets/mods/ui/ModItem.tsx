import { Mod } from '@/renderer/entities/modpack';
import { NoThumbnailModIcon } from '@/renderer/shared/ui';
import { Image } from '@heroui/react';
import { FC } from 'react';

interface ModItemProps {
  item: Mod;
}

export const ModItem: FC<ModItemProps> = ({ item }) => {
  return (
    <a
      className="w-full flex items-center gap-3 py-4 px-6 rounded-xl relative before:z-10 before:absolute before:inset-0 before:rounded-xl hover:before:bg-gray before:opacity-20 before:transition-all"
      target="_blank"
      rel="noreferrer"
      {...(item.modrinthSlug
        ? {
            href: `https://modrinth.com/mod/${item.modrinthSlug}`,
            title: `https://modrinth.com/mod/${item.modrinthSlug}`,
          }
        : {})}
    >
      {item.thumbnail ? (
        <Image
          src={item.thumbnail}
          alt={item.name}
          width={60}
          height={60}
          classNames={{ wrapper: 'rounded-xl relative z-20' }}
        />
      ) : (
        <NoThumbnailModIcon />
      )}
      <div className="text-xl relative z-20">{item.name}</div>
    </a>
  );
};
