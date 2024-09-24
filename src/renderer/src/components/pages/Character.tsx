import { FC, useEffect, useRef } from 'react';
import { SkinViewer, WalkingAnimation } from '@jebibot/skinview3d';
import skinImage from '../../../../../resources/skin.png';
import capeImage from '../../../../../resources/Плащ.png';

const Character: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (canvasRef.current && canvasWrapperRef.current) {
      new SkinViewer({
        canvas: canvasRef.current,
        width: canvasWrapperRef.current.offsetWidth,
        height: canvasWrapperRef.current.offsetHeight,
        skin: skinImage,
        cape: capeImage,
        animation: new WalkingAnimation(),
      });
    }
  }, []);

  return (
    <div className="flex flex-grow items-stretch">
      <div className="w-1/2" ref={canvasWrapperRef}>
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  );
};

export default Character;
