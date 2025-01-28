import {
  useDeleteCapeMutation,
  useGetCharacterQuery,
} from '@/renderer/entities/character';
import { ThrashIcon } from '@/renderer/shared/ui';
import { Button, useDisclosure } from '@heroui/react';
import log from 'electron-log/renderer';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import { CharacterDropZoneModal } from './CharacterDropZoneModal';

export const CharacterSkinCapeChanger: FC = () => {
  const [uploadType, setUploadType] = useState<'cape' | 'skin' | null>(null);
  const { data } = useGetCharacterQuery(window.localStorage.getItem('hwid')!);
  const [deleteCape, { isLoading }] = useDeleteCapeMutation();

  const { isOpen, onOpenChange } = useDisclosure();

  const uploaderButtonClickHandler = (type: 'cape' | 'skin') => (): void => {
    onOpenChange();
    setUploadType(type);
  };

  const deleteCapeClickHandler = async (): Promise<void> => {
    try {
      await deleteCape(window.localStorage.getItem('hwid')!).unwrap();

      toast.success('Плащ успешно удалён');
      log.info('Cape deleted');
    } catch (e) {
      toast.error('Произошла ошибка при удалении плаща');
      log.error('Error while deleting cape', e);
    }
  };

  return (
    <>
      <Button
        onPress={uploaderButtonClickHandler('skin')}
        size="lg"
        className="w-[400px]"
        color="primary"
      >
        Загрузить скин
      </Button>
      <div className="flex gap-4">
        <Button
          onPress={uploaderButtonClickHandler('cape')}
          size="lg"
          className="w-[400px]"
          color="primary"
        >
          Загрузить плащ
        </Button>
        {data?.cape !== null && (
          <Button
            color="danger"
            isLoading={isLoading}
            onPress={deleteCapeClickHandler}
            size="lg"
            isIconOnly
          >
            <ThrashIcon />
          </Button>
        )}
      </div>
      <div className="w-[70%] text-sm">
        *На данный момент скины работают в сборках, версия которых выше 1.7.10
      </div>
      <CharacterDropZoneModal
        setModalIsOpen={onOpenChange}
        modalIsOpen={isOpen}
        uploadType={uploadType}
      />
    </>
  );
};
