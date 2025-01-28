import { useUpdateCharacterMutation } from '@/renderer/entities/character';
import { useGetModPacksQuery } from '@/renderer/entities/modpack';
import { useMinecraft } from '@/renderer/shared/lib';
import { DotsLoader, UploadSvg } from '@/renderer/shared/ui';
import { Modal, ModalBody, ModalContent } from '@heroui/react';
import clsx from 'clsx';
import log from 'electron-log/renderer';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

interface CharacterDropZoneModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  uploadType: 'cape' | 'skin' | null;
}

export const CharacterDropZoneModal: FC<CharacterDropZoneModalProps> = ({
  setModalIsOpen,
  modalIsOpen,
  uploadType,
}) => {
  const [updateCharacter, { isLoading, isSuccess }] =
    useUpdateCharacterMutation();
  const {
    modpacks: { current },
  } = useMinecraft();
  const { isSuccess: modpacksIsSuccess, data: modpacks } =
    useGetModPacksQuery();
  const [fileError, setFileError] = useState<boolean>(false);

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
      toast.success(
        `${uploadType === 'skin' ? 'Скин' : 'Плащ'} успешно обновлен`
      );

      if (current && modpacksIsSuccess) {
        const { minecraftVersion } = modpacks.find(
          modpack => modpack.id === current
        )!;

        if (+minecraftVersion.split('.')[1] < 8) {
          await new Promise(resolve => setTimeout(resolve, 500));
          toast.warning(
            `У вас выбрана сборка с версией ${minecraftVersion} - эта версия не поддерживает смену скинов`
          );
        }
      }

      log.info(`Character ${uploadType} updated`);
    } catch (e) {
      toast.error(
        `Произошла ошибка при обновлении ${uploadType === 'skin' ? 'скина' : 'плаща'}`
      );
      log.error(`Character ${uploadType} update error: `, e);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop: dropHandler,
      accept: {
        'image/png': ['.png', '.jpeg', '.jpg'],
      },
      maxFiles: 1,
      maxSize: 5242880,
      onError: err => {
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
      onOpenChange={setModalIsOpen}
      classNames={{
        wrapper: 'scrollbar-none',
      }}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        },
      }}
    >
      <ModalContent className="bg-transparent shadow-none">
        <ModalBody>
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
                }
              )}
              {...getRootProps()}
            >
              <input {...getInputProps()} />

              {isLoading ? (
                <DotsLoader color="#F4F8FE" secondaryColor="#F4F8FE" />
              ) : (
                <UploadSvg
                  isHover={isDragActive}
                  isError={isDragReject || fileError}
                />
              )}
              <p
                className={clsx(
                  'text-red-400 absolute w-[400px] text-center top-[105%] left-1/2 -translate-x-1/2 opacity-0 transition',
                  {
                    'opacity-100': isDragReject || fileError,
                  }
                )}
              >
                Тип файла не поддерживается или файл слишком большой (5 Мбайт)
              </p>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
