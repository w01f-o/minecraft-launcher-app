import { FC } from 'react';
import vladImage from '../../../../../../resources/vladbg.webp';

const VladBackGround: FC = () => {
  return (
    <div className="absolute -left-10 -bottom-10  w-auto h-[70vh] -z-10">
      <img src={vladImage} alt="" className="size-full" />
    </div>
  );
};

export default VladBackGround;
