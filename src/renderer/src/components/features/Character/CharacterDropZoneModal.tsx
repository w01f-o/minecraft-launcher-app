import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Modal from '../../shared/UI/Modal';
import clsx from 'clsx';
import UploadSvg from '../../shared/Icons/UploadSvg';
import { useDropzone } from 'react-dropzone';
import { useUpdateCharacterMutation } from '../../../services/character.api';
import DotsLoader from '@renderer/components/widgets/Loaders/DotsLoader';
import { useToast } from '@renderer/hooks/useToast';
import log from 'electron-log/renderer';
import { useMinecraft } from '@renderer/hooks/useMinecraft';

interface CharacterDropZoneModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  uploadType: 'cape' | 'skin' | null;
}

const CharacterDropZoneModal: FC<CharacterDropZoneModalProps> = ({
  setModalIsOpen,
  modalIsOpen,
  uploadType,
}) => {
  const [updateCharacter, { isLoading, isSuccess }] = useUpdateCharacterMutation();
  const { currentModPack } = useMinecraft();
  const [fileError, setFileError] = useState<boolean>(false);

  const toast = useToast();

  const dropHandler = async (acceptedFiles: File[]): Promise<void> => {
    if (acceptedFiles.length === 0) {
      setFileError(true);

      return;
    }

    const formData = new FormData();

    switch (uploadType) {
      case 'skin':
        formData.append('skin', acceptedFiles[0]);
        break;
      case 'cape':
        formData.append('cape', acceptedFiles[0]);
        break;
    }
    const hwid = window.localStorage.getItem('hwid')!;
    formData.append('hwid', hwid);

    try {
      await updateCharacter(formData).unwrap();
      toast.add({
        type: 'success',
        message: `${uploadType === 'skin' ? 'Скин' : 'Плащ'} успешно обновлен`,
      });

      if (currentModPack && +currentModPack.minecraftVersion.split('.')[1] < 8) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        toast.add({
          type: 'warning',
          message: `У вас выбрана сборка с версией ${currentModPack?.minecraftVersion} - эта версия не поддерживает смену скинов`,
        });
      }

      log.info(`Character ${uploadType} updated`);
    } catch (e) {
      toast.add({
        type: 'error',
        message: `Произошла ошибка при обновлении ${uploadType === 'skin' ? 'скина' : 'плаща'}`,
      });

      log.error(`Character ${uploadType} update error: `, e);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop: dropHandler,
    accept: {
      'image/png': ['.png', '.jpeg', '.jpg'],
    },
    maxFiles: 1,
    maxSize: 5242880,
    onError: (err) => {
      console.error(err);
    },
    autoFocus: true,
    onDragEnter: () => {
      setFileError(false);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setModalIsOpen(!modalIsOpen);
    }
  }, [isSuccess]);

  return (
    <Modal
      isOpen={modalIsOpen}
      setIsOpen={() => {
        setModalIsOpen(!modalIsOpen);
        setFileError(false);
      }}
      preventClose={isLoading}
      contentClassName="!w-[50vw]"
    >
      <div className="flex gap-6 flex-col items-center justify-center h-[70vh]">
        <h2
          className={clsx('text-white text-4xl transition-all', {
            '!text-blue': isDragActive && !isDragReject,
            '!text-red-400': isDragReject || fileError,
          })}
        >
          {uploadType === 'cape' ? 'Загрузить плащ' : 'Загрузить скин'}
        </h2>
        <div
          className={clsx(
            'grid relative focus:outline-none place-items-center size-60 border-white rounded-2xl border-2 border-dashed cursor-pointer transition-all',
            {
              '!border-blue': isDragActive && !isDragReject,
              'cursor-progress': isLoading,
              '!border-red-400': isDragReject || fileError,
            },
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          {isLoading ? (
            <DotsLoader color="#F4F8FE" secondaryColor="#F4F8FE" />
          ) : (
            <UploadSvg isHover={isDragActive} isError={isDragReject || fileError} />
          )}
          <p
            className={clsx(
              'text-red-400 absolute w-[50vw] text-center top-[105%] left-1/2 -translate-x-1/2 opacity-0 transition',
              {
                'opacity-100': isDragReject || fileError,
              },
            )}
          >
            Тип файла не поддерживается или файл слишком большой (5 Мбайт)
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default CharacterDropZoneModal;
