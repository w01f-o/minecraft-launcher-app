import { FC, useEffect, useRef, useState } from 'react';
import { useGetCharacterQuery } from '../../../services/character.api';
import { SkinViewer, WalkingAnimation } from '@jebibot/skinview3d';
import steveDefaultSkinTexture from '../../../../../../resources/steve.png';
import type { RemoteImage, TextureSource } from '@jebibot/skinview-utils';
import { MutatingDots } from 'react-loader-spinner';
import ErrorMessage from '../../features/Errors/ErrorMessage';

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

  const fetchTextures = async () => {
    setTexturesIsLoading(true);
    setTexturesError(null);
    if (!data || data.skins.default === null) {
      setTexturesData({ cape: null, skin: steveDefaultSkinTexture });
      setTexturesIsLoading(false);

      return;
    }

    try {
      if (data.cape !== null) {
        const [skinResponse, capeResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/character/textures/${data.skins.default}`),
          fetch(`${import.meta.env.VITE_API_URL}/character/textures/${data.cape}`),
        ]);

        const [skinBlob, capeBlob] = await Promise.all([skinResponse.blob(), capeResponse.blob()]);
        const [skinTexture, capeTexture] = await Promise.all([
          createImageBitmap(skinBlob),
          createImageBitmap(capeBlob),
        ]);

        setTexturesData({ skin: skinTexture, cape: capeTexture });
      } else {
        const skinResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/character/textures/${data.skins.default}`,
        );
        const skinBlob = await skinResponse.blob();
        const skinTexture = await createImageBitmap(skinBlob);

        setTexturesData({ skin: skinTexture, cape: null });
      }
    } catch (e: any) {
      console.error(e);
      setTexturesError(JSON.stringify(e.message));
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
    }

    const resizeHandler = (): void => {
      if (canvasRef.current && canvasWrapperRef.current) {
        const { offsetWidth: width, offsetHeight: height } = canvasWrapperRef.current;

        skinViewerRef.current?.setSize(width, height);
      }
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [canvasRef.current, texturesData]);

  useEffect(() => {
    fetchTextures();
  }, [data]);

  useEffect(() => {
    if (texturesData && skinViewerRef.current) {
      skinViewerRef.current.loadSkin(texturesData.skin);

      texturesData.cape && skinViewerRef.current.loadCape(texturesData.cape);
    }
  }, [texturesData]);

  return (
    <div className="grid place-items-center w-1/2 h-[70vh] relative" ref={canvasWrapperRef}>
      {texturesIsLoading && (
        <MutatingDots
          color="#85A2E8"
          wrapperClass="justify-center"
          secondaryColor="#85A2E8"
          width={100}
          height={100}
        />
      )}
      {texturesError !== null && <ErrorMessage message={texturesError} />}
      {!texturesIsLoading && texturesError === null && <canvas ref={canvasRef}></canvas>}
    </div>
  );
};

export default CharacterCanvas;
