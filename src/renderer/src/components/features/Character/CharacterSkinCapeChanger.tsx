import { FC, useState } from 'react';
import Button from '../../shared/UI/Button';
import ThrashIcon from '../../shared/Icons/ThrashIcon';
import CharacterDropZoneModal from './CharacterDropZoneModal';
import { useDeleteCapeMutation, useGetCharacterQuery } from '../../../services/character.api';
import { useToast } from '@renderer/hooks/useToast';
import log from 'electron-log/renderer';

const CharacterSkinCapeChanger: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<'cape' | 'skin' | null>(null);
  const { data } = useGetCharacterQuery(window.localStorage.getItem('hwid')!);
  const [deleteCape, { isLoading }] = useDeleteCapeMutation();

  const toast = useToast();

  const uploaderButtonClickHandler = (type: 'cape' | 'skin') => (): void => {
    setModalIsOpen(!modalIsOpen);
    setUploadType(type);
  };

  const deleteCapeClickHandler = async (): Promise<void> => {
    try {
      await deleteCape(window.localStorage.getItem('hwid')!).unwrap();

      toast.add({
        type: 'success',
        message: 'Плащ успешно удалён',
      });
      log.info('Cape deleted');
    } catch (e) {
      toast.add({
        type: 'error',
        message: 'Произошла ошибка при удалении плаща',
      });
      log.error('Error while deleting cape', e);
    }
  };

  return (
    <>
      <Button className="w-[80%]" role={'primary'} onClick={uploaderButtonClickHandler('skin')}>
        Загрузить скин
      </Button>
      <div className="flex gap-4">
        <Button role={'secondary'} onClick={uploaderButtonClickHandler('cape')} className="w-[80%]">
          Загрузить плащ
        </Button>
        {data?.cape !== null && (
          <Button
            role={'primary'}
            minify
            danger
            isPending={isLoading}
            onClick={deleteCapeClickHandler}
          >
            <ThrashIcon />
          </Button>
        )}
      </div>
      <CharacterDropZoneModal
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        uploadType={uploadType}
      />
    </>
  );
};

export default CharacterSkinCapeChanger;
