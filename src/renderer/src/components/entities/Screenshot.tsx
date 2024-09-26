import { FC } from 'react';
import type { Screenshot as ScreenshotType } from '../../types/entities/Screenshot.type';

interface ScreenshotProps {
  item: ScreenshotType;
  name: string;
}

const Screenshot: FC<ScreenshotProps> = ({ item, name }) => {
  return (
    <div className="w-full h-[60vh] overflow-hidden rounded-2xl flex justify-start">
      <img
        src={`${import.meta.env.VITE_STATIC_URL}/${item.thumbnail}`}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Screenshot;
