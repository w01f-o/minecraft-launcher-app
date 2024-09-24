import { FC, useEffect, useRef } from 'react';
import { SkinViewer } from '@jebibot/skinview3d';
import skinImage from '../../../../../resources/skin.png';

const Skins: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const skinViewer = new SkinViewer({
        canvas: canvasRef.current,
        width: 300,
        height: 400,
        skin: skinImage,
      });

      skinViewer.width = 300;
      skinViewer.height = 500;
    }
  }, []);

  return (
    <div className="flex items-center">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Skins;
