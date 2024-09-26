import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { SkinViewer, WalkingAnimation } from '@jebibot/skinview3d';
import steveDefaultSkin from '../../../../../resources/steve.png';
import Field from '../shared/UI/Field';
import { useMinecraft } from '../../hooks/useMinecraft';
import Button from '../shared/UI/Button';
import Modal from '../shared/UI/Modal';
import { useDropzone } from 'react-dropzone';
import UploadSvg from '../shared/Icons/UploadSvg';
import clsx from 'clsx';
import { useGetCharacterQuery, useUpdateCharacterMutation } from '../../services/character.api';

const Character: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading } = useGetCharacterQuery(window.localStorage.getItem('hwid')!);

  useEffect(() => {
    if (canvasRef.current && canvasWrapperRef.current && data) {
      const skinViewer = new SkinViewer({
        canvas: canvasRef.current,
        width: canvasWrapperRef.current.offsetWidth,
        height: canvasWrapperRef.current.offsetHeight,
        skin: data.skins.default
          ? `${import.meta.env.VITE_API_URL}/character/textures/${data.skins.default}`
          : steveDefaultSkin,
        animation: new WalkingAnimation(),
      });

      if (data.cape) {
        skinViewer.loadCape(`${import.meta.env.VITE_API_URL}/character/textures/${data.cape}`);
      }
    }
  }, [data]);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<'cape' | 'skin' | null>();

  const uploaderButtonClickHandler = (type: 'cape' | 'skin') => (): void => {
    setModalIsOpen(!modalIsOpen);
    setUploadType(type);
  };

  const [updateCharacter] = useUpdateCharacterMutation();

  const dropHandler = async (acceptedFiles: File[]) => {
    const formData = new FormData();
    setModalIsOpen(!modalIsOpen);

    switch (uploadType) {
      case 'skin':
        formData.append('skin', acceptedFiles[0]);
        break;
      case 'cape':
        formData.append('cape', acceptedFiles[0]);
        break;
    }
    const hwid = await window.utils.getHwid();
    formData.append('hwid', hwid);

    updateCharacter(formData);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: dropHandler });

  const { username, setUsername } = useMinecraft();
  const [inputLocalName, setInputLocalName] = useState<string>('');

  useEffect(() => {
    if (username !== null) {
      setInputLocalName(username);
    }
  }, [username]);

  const inputLocalNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputLocalName(e.target.value);
  };

  const submitChangeNameHandler = async () => {
    const formData = new FormData();
    formData.append('hwid', window.localStorage.getItem('hwid')!);
    formData.append('username', inputLocalName);

    updateCharacter(formData);
    setUsername(inputLocalName);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="flex flex-grow items-stretch">
      <div className="w-1/2" ref={canvasWrapperRef}>
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
      <div className="w-1/3 py-20">
        <div className="flex flex-col gap-3">
          <div className="text-2xl">Имя персонажа:</div>
          <div className="flex">
            <Field value={inputLocalName} onChange={inputLocalNameChangeHandler} />
            {inputLocalName !== username && (
              <Button role={'primary'} minify onClick={submitChangeNameHandler}></Button>
            )}
          </div>
          <Button role={'secondary'} onClick={uploaderButtonClickHandler('skin')}>
            Загрузить скин
          </Button>
          <div className="flex">
            <Button
              role={'secondary'}
              onClick={uploaderButtonClickHandler('cape')}
              className="w-full"
            >
              Загрузить плащ
            </Button>
            {/*<Button role={'primary'} minify danger>*/}
            {/*  <ThrashIcon />*/}
            {/*</Button>*/}
          </div>
          <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
            <div className="flex gap-6 flex-col items-center justify-center h-[70vh]">
              <h2
                className={clsx('text-white text-4xl transition-all', {
                  '!text-blue': isDragActive,
                })}
              >
                {uploadType === 'cape' ? 'Загрузить плащ' : 'Загрузить скин'}
              </h2>
              <div
                className={clsx(
                  'grid place-items-center size-60 border-white rounded-2xl border-2 border-dashed cursor-pointer transition-all',
                  {
                    '!border-blue': isDragActive,
                  },
                )}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <UploadSvg isHover={isDragActive} />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Character;
