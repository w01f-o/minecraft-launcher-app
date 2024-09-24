import { FC, useRef, useState } from 'react';
import screenshot from '../../../../../resources/screenshot1.jpg';
import screenshot2 from '../../../../../resources/screenshot2.jpg';
import screenshot3 from '../../../../../resources/screenshot3.jpg';
import Modal from '../shared/UI/Modal';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import GallerySwiperButtons from '../widgets/GallerySwiperButtons';

const Screenshots: FC = () => {
  const screenshots: string[] = [
    screenshot,
    screenshot2,
    screenshot3,
    screenshot,
    screenshot2,
    screenshot3,
    screenshot,
    screenshot2,
    screenshot3,
    screenshot,
    screenshot2,
    screenshot3,
  ];

  const [galleryIsOpen, setGalleryIsOpen] = useState<boolean>(false);
  const [initialIndex, setInitialIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const clickHandler = (index: number) => (): void => {
    setGalleryIsOpen(!galleryIsOpen);
    setInitialIndex(index);
  };

  return (
    <div className="custom-scrollbar overflow-y-auto">
      <div className="flex flex-wrap max-h-[70vh]">
        {screenshots.map((item, index) => (
          <div key={index} className="xl:w-1/5 w-1/3 p-3 h-56">
            <button
              className="peer flex overflow-hidden h-full relative before:pointer-events-none rounded-xl cursor-pointer active:scale-[.99] transition hover:scale-[1.03] before:absolute before:inset-0 hover:before:bg-black before:opacity-25 before:rounded-xl before:transition"
              onClick={clickHandler(index)}
            >
              <img src={item} alt={item} className="w-full h-full object-cover" />
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen={galleryIsOpen} setIsOpen={setGalleryIsOpen}>
        <Swiper
          slidesPerView={1}
          loop
          spaceBetween={50}
          className="w-full rounded-3xl"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          initialSlide={initialIndex}
        >
          <GallerySwiperButtons isOpen={galleryIsOpen} />
          {screenshots.map((screenshot, index) => (
            <SwiperSlide key={index} className="h-full">
              <div className="h-full w-full overflow-hidden rounded-3xl flex justify-start items-center">
                <img
                  src={screenshot}
                  alt={screenshot}
                  className="w-full h-full aspect-video object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </div>
  );
};

export default Screenshots;
