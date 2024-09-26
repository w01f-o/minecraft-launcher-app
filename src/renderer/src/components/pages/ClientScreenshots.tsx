import { FC, useEffect, useState } from 'react';
import Modal from '../shared/UI/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import GallerySwiperButtons from '../widgets/GallerySwiperButtons';
import ClientScreenshot from '../entities/ClientScreenshot';
import Button from '../shared/UI/Button';
import DownloadIcon from '../shared/Icons/DownloadIcon';
import ThrashIcon from '../shared/Icons/ThrashIcon';

const ClientScreenshots: FC = () => {
  const [galleryIsOpen, setGalleryIsOpen] = useState<boolean>(false);
  const [initialIndex, setInitialIndex] = useState<number>(0);
  const [clientScreenshots, setClientScreenshots] = useState<string[]>([]);

  const clickHandler = (index: number) => (): void => {
    setGalleryIsOpen(!galleryIsOpen);
    setInitialIndex(index);
  };

  const fetchScreenshots = async (): Promise<void> => {
    const result = await window.electron.ipcRenderer.invoke('GET_LAUNCHER_SCREENSHOTS');

    setClientScreenshots(result);
  };

  useEffect(() => {
    fetchScreenshots();
  }, []);

  const downloadClickHandler = (): void => {
    window.electron.ipcRenderer.send('SAVE_SCREENSHOT', clientScreenshots[initialIndex]);
  };

  const deleteClickHandler = (): void => {
    setGalleryIsOpen(!galleryIsOpen);
    window.electron.ipcRenderer.send('DELETE_SCREENSHOT', clientScreenshots[initialIndex]);
    fetchScreenshots();
  };

  return (
    <div className="custom-scrollbar overflow-y-auto">
      <div className="flex flex-wrap max-h-[70vh]">
        {clientScreenshots.map((item, index) => (
          <ClientScreenshot
            key={index}
            isPreview
            screenshot={item}
            index={index}
            clickHandler={clickHandler}
          />
        ))}
      </div>
      <Modal isOpen={galleryIsOpen} setIsOpen={setGalleryIsOpen}>
        <Swiper
          slidesPerView={1}
          loop
          spaceBetween={50}
          className="w-full rounded-3xl"
          initialSlide={initialIndex}
          onSlideChange={(swiper) => setInitialIndex(swiper.realIndex)}
        >
          <GallerySwiperButtons isOpen={galleryIsOpen} />
          {clientScreenshots.map((screenshot, index) => (
            <SwiperSlide key={index} className="h-full">
              <ClientScreenshot key={screenshot} screenshot={screenshot} />
            </SwiperSlide>
          ))}
          <div className="absolute right-8 bottom-8 z-40 shadow-2xl">
            <Button role={'primary'} rounded onClick={downloadClickHandler}>
              <DownloadIcon />
            </Button>
          </div>{' '}
          <div className="absolute right-24 bottom-8 z-40 shadow-2xl">
            <Button role={'primary'} danger rounded onClick={deleteClickHandler}>
              <ThrashIcon />
            </Button>
          </div>
        </Swiper>
      </Modal>
    </div>
  );
};

export default ClientScreenshots;