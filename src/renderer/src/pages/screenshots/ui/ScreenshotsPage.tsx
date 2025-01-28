import { MainEvents, MainInvokeEvents } from '@/renderer/shared/model';
import { DotsLoader, DownloadIcon, ThrashIcon } from '@/renderer/shared/ui';
import { ClientScreenshot } from '@/renderer/widgets/screenshots';
import { GallerySwiperButtons } from '@/renderer/widgets/screenshots/ui/GallerySwiperButtons';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@heroui/react';
import { FC, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Swiper, SwiperSlide } from 'swiper/react';
import sadGif from '../../../../../../resources/sad-azolotl.gif';

export const ScreenshotsPage: FC = () => {
  const [initialIndex, setInitialIndex] = useState<number>(0);
  const [clientScreenshots, setClientScreenshots] = useState<string[]>([]);

  const { onOpenChange, isOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const clickHandler = (index: number) => (): void => {
    onOpenChange();
    setInitialIndex(index);
  };

  const fetchScreenshots = async (): Promise<void> => {
    setIsLoading(true);
    const result = await window.electron.ipcRenderer.invoke(
      MainInvokeEvents.GET_MODPACKS_SCREENSHOTS
    );

    setClientScreenshots(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchScreenshots();
  }, []);

  const downloadClickHandler = (): void => {
    window.electron.ipcRenderer.send(
      MainEvents.SAVE_SCREENSHOT,
      clientScreenshots[initialIndex]
    );
  };

  const deleteClickHandler = async (): Promise<void> => {
    onOpenChange();
    const result = await window.electron.ipcRenderer.invoke(
      'DELETE_SCREENSHOT',
      clientScreenshots[initialIndex]
    );
    if (result.isSuccess) {
      toast.success('Скриншот успешно удален');
      fetchScreenshots();
    } else {
      toast.error('Не удалось удалить скриншот');
    }
  };

  if (isLoading) {
    return (
      <div className="flex-grow grid place-items-center">
        <DotsLoader color="#85A2E8" secondaryColor="#85A2E8" />
      </div>
    );
  }

  return clientScreenshots.length ? (
    <div className="custom-scrollbar overflow-y-auto">
      <div className="flex flex-wrap max-h-[70vh]">
        {clientScreenshots.map((screenshot, index) => (
          <ClientScreenshot
            key={screenshot}
            isPreview
            screenshot={screenshot}
            index={index}
            clickHandler={clickHandler}
          />
        ))}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
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
            <Swiper
              slidesPerView={1}
              loop
              spaceBetween={50}
              className="w-full rounded-3xl"
              initialSlide={initialIndex}
              onSlideChange={swiper => setInitialIndex(swiper.realIndex)}
            >
              {clientScreenshots.length > 1 && (
                <GallerySwiperButtons isOpen={isOpen} />
              )}
              {clientScreenshots.map(screenshot => (
                <SwiperSlide key={screenshot} className="h-full">
                  <ClientScreenshot key={screenshot} screenshot={screenshot} />
                </SwiperSlide>
              ))}
              <div className="absolute right-8 bottom-8 z-40 shadow-2xl">
                <Button
                  isIconOnly
                  onPress={downloadClickHandler}
                  color="primary"
                >
                  <DownloadIcon />
                </Button>
              </div>
              <div className="absolute right-24 bottom-8 z-40 shadow-2xl">
                <Button isIconOnly onPress={deleteClickHandler} color="danger">
                  <ThrashIcon />
                </Button>
              </div>
            </Swiper>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  ) : (
    <div className="grid place-items-center flex-grow text-4xl">
      <div className="flex flex-col gap-4 items-center">
        <div>
          <img src={sadGif} alt="" />
        </div>
        <div>Скриншотов пока-что нет</div>
      </div>
    </div>
  );
};
