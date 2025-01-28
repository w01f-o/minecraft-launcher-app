import { FC } from 'react';
import { BackgroundCloudIcon } from '../icons';

const Background: FC = () => {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background:
          'linear-gradient(137.88deg, rgb(255, 255, 255) 0.298%,rgb(222, 234, 255) 0.308%,rgb(226, 236, 252) 9.472%,rgb(241, 241, 241) 47.649%,rgb(222, 234, 255) 101.289%)',
      }}
    >
      <BackgroundCloudIcon variant={'top'} className="absolute right-0 top-0" />
      <BackgroundCloudIcon
        variant={'left'}
        className="absolute left-0 top-1/2 translate-y-[-50%]"
      />
      <BackgroundCloudIcon
        variant={'bottom'}
        className="absolute right-36 bottom-0"
      />
    </div>
  );
};

export default Background;
