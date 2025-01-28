import { useGetCharacterQuery } from '@/renderer/entities/character';
import { axiosInstance } from '@/renderer/shared/api';
import { DotsLoader, ErrorMessage } from '@/renderer/shared/ui';
import type { RemoteImage, TextureSource } from '@jebibot/skinview-utils';
import { SkinViewer, WalkingAnimation } from '@jebibot/skinview3d';
import { animated, useSpring } from '@react-spring/web';
import log from 'electron-log/renderer';
import { FC, useEffect, useRef, useState } from 'react';
import steveDefaultSkinTexture from '../../../../../../resources/steve.png';

export const CharacterCanvas: FC = () => {
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
        const { data: blob } = await axiosInstance.get(
          `/characters/textures/${data.skins.default}`,
          {
            responseType: 'blob',
          }
        );

        return createImageBitmap(blob);
      }

      return null;
    };

    const fetchCape = async (): Promise<TextureSource | null> => {
      if (data.cape) {
        const { data: blob } = await axiosInstance.get(
          `/characters/textures/${data.cape}`,
          {
            responseType: 'blob',
          }
        );

        return createImageBitmap(blob);
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
      const { offsetWidth: width, offsetHeight: height } =
        canvasWrapperRef.current;

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
        const { offsetWidth: width, offsetHeight: height } =
          canvasWrapperRef.current;

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
    <div
      className="grid place-items-center w-1/2 h-[70vh] relative"
      ref={canvasWrapperRef}
    >
      {texturesIsLoading && (
        <DotsLoader
          color="#85A2E8"
          wrapperClass="justify-center"
          secondaryColor="#85A2E8"
          width={100}
          height={100}
        />
      )}
      {texturesError !== null && (
        <ErrorMessage
          message={'Произошла ошибка, возможно вы загрузили некорректный файл'}
        />
      )}
      {!texturesIsLoading && texturesError === null && (
        <animated.canvas ref={canvasRef} style={springProps}></animated.canvas>
      )}
    </div>
  );
};
