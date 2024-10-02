import { FC, useEffect, useRef, useState } from 'react';
import { useGetCharacterQuery } from '../../../services/character.api';
import { SkinViewer, WalkingAnimation } from '@jebibot/skinview3d';
import steveDefaultSkinTexture from '../../../../../../resources/steve.png';
import type { RemoteImage, TextureSource } from '@jebibot/skinview-utils';
import ErrorMessage from '../../features/Errors/ErrorMessage';
import DotsLoader from '@renderer/components/widgets/DotsLoader';
import { useSpring, animated } from '@react-spring/web';
import log from 'electron-log/renderer';

const CharacterCanvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
  const skinViewerRef = useRef<SkinViewer | null>(null);

  const { data } = useGetCharacterQuery(window.localStorage.getItem('hwid')!);

  const [texturesIsLoading, setTexturesIsLoading] = useState<boolean>(true);
  const [texturesError, setTexturesError] = useState<string | null>(null);

  const [texturesData, setTexturesData] = useState<{
    skin: TextureSource | RemoteImage;
    cape: TextureSource | RemoteImage | null;
  } | null>(null);

  const fetchTextures = async (): Promise<void> => {
    setTexturesIsLoading(true);
    setTexturesError(null);
    if (!data) {
      setTexturesError('Fetch error');
      setTexturesIsLoading(false);

      return;
    }

    const fetchSkin = async (): Promise<TextureSource | null> => {
      if (data.skins.default) {
        const skinResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/character/textures/${data.skins.default}`,
        );
        const skinBlob = await skinResponse.blob();

        return await createImageBitmap(skinBlob);
      }

      return null;
    };

    const fetchCape = async (): Promise<TextureSource | null> => {
      if (data.cape) {
        const capeResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/character/textures/${data.cape}`,
        );
        const capeBlob = await capeResponse.blob();

        return await createImageBitmap(capeBlob);
      }

      return null;
    };

    try {
      log.info('Fetching character textures... for: ', data);
      const [cape, skin] = await Promise.all([fetchCape(), fetchSkin()]);

      setTexturesData({ skin: skin ?? steveDefaultSkinTexture, cape });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setTexturesError(error.message);
      }
      log.error(error);
    } finally {
      setTexturesIsLoading(false);
    }
  };

  useEffect(() => {
    if (canvasRef.current && canvasWrapperRef.current) {
      const { offsetWidth: width, offsetHeight: height } = canvasWrapperRef.current;

      skinViewerRef.current = new SkinViewer({
        canvas: canvasRef.current,
        width,
        height,
        animation: new WalkingAnimation(),
      });

      skinViewerRef.current.autoRotate = true;
      skinViewerRef.current.autoRotateSpeed = 0.5;
    }

    const resizeHandler = (): void => {
      if (canvasRef.current && canvasWrapperRef.current) {
        const { offsetWidth: width, offsetHeight: height } = canvasWrapperRef.current;

        skinViewerRef.current?.setSize(width, height);
      }
    };

    window.addEventListener('resize', resizeHandler);

    return (): void => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [canvasRef.current, texturesData]);

  useEffect(() => {
    fetchTextures();
  }, [data]);

  useEffect(() => {
    try {
      if (texturesData && skinViewerRef.current) {
        skinViewerRef.current.loadSkin(texturesData.skin);

        texturesData.cape && skinViewerRef.current.loadCape(texturesData.cape);

        log.info('Character textures loaded: ', texturesData);
      }
    } catch (error) {
      if (error instanceof Error) {
        setTexturesError(error.message);
      }

      log.error(error);
    }
  }, [texturesData]);

  const springProps = useSpring({
    opacity: texturesIsLoading ? 0 : 1,
    transform: texturesIsLoading ? 'scale(0.95)' : 'scale(1)',
    config: { tension: 170, friction: 26 },
  });

  return (
    <div className="grid place-items-center w-1/2 h-[70vh] relative" ref={canvasWrapperRef}>
      {texturesIsLoading && (
        <DotsLoader
          color="#85A2E8"
          wrapperClass="justify-center"
          secondaryColor="#85A2E8"
          width={100}
          height={100}
        />
      )}
      {texturesError !== null && <ErrorMessage message={texturesError} />}
      {!texturesIsLoading && texturesError === null && (
        <animated.canvas ref={canvasRef} style={springProps}></animated.canvas>
      )}
    </div>
  );
};

export default CharacterCanvas;
