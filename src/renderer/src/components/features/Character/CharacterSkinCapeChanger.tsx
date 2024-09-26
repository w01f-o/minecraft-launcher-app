import { FC, useState } from 'react';
import Button from '../../shared/UI/Button';
import ThrashIcon from '../../shared/Icons/ThrashIcon';
import CharacterDropZoneModal from './CharacterDropZoneModal';
import { useDeleteCapeMutation } from '../../../services/character.api';

interface CharacterSkinCapeChangerProps {}

const CharacterSkinCapeChanger: FC<CharacterSkinCapeChangerProps> = ({}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [uploadType, setUploadType] = useState<'cape' | 'skin' | null>(null);

  const [deleteCape, { isLoading }] = useDeleteCapeMutation();

  const uploaderButtonClickHandler = (type: 'cape' | 'skin') => (): void => {
    setModalIsOpen(!modalIsOpen);
    setUploadType(type);
  };

  const deleteCapeClickHandler = () => {
    deleteCape(window.localStorage.getItem('hwid')!);
  };

  return (
    <>
      <Button className="w-[80%]" role={'secondary'} onClick={uploaderButtonClickHandler('skin')}>
        Загрузить скин
      </Button>
      <div className="flex gap-4">
        <Button role={'secondary'} onClick={uploaderButtonClickHandler('cape')} className="w-[80%]">
          Загрузить плащ
        </Button>
        <Button
          role={'primary'}
          minify
          danger
          isPending={isLoading}
          onClick={deleteCapeClickHandler}
        >
          <ThrashIcon />
        </Button>
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
