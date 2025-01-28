import { Modpack } from '@/renderer/entities/modpack';
import { ModPackController } from '@/renderer/features/modpacks';
import { ActualIcon } from '@/renderer/shared/ui';
import { Image, Modal, ModalBody, ModalContent } from '@heroui/react';
import { FC } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ModList } from '../../mods';

interface ModPackModalProps {
  item: Modpack;
  isOpen: boolean;
  onOpenChange: () => void;
}

export const ModPackModal: FC<ModPackModalProps> = ({
  isOpen,
  onOpenChange,
  item,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="outside"
      onOpenChange={onOpenChange}
      size="5xl"
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
          <div className="flex flex-col w-full text-white">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              loop
              spaceBetween={50}
              className="w-full rounded-2xl overflow-hidden"
              autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
            >
              {item.screenshots.map(screenshot => (
                <SwiperSlide key={screenshot.id}>
                  <Image
                    src={`${import.meta.env.VITE_API_URL}/${screenshot.url}`}
                    alt={item.name}
                    width={'100%'}
                    height={'60vh'}
                    className="rounded-2xl aspect-video object-cover size-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex flex-col px-6 py-6">
              <div className="flex flex-col justify-between gap-2">
                <ModPackController
                  setModalIsOpen={onOpenChange}
                  item={item}
                  modalIsOpen={isOpen}
                />
                <div className="flex items-center gap-4 mb-2">
                  <div className="text-2xl">{item.minecraftVersion}</div>
                  {item.isActual && (
                    <div className="flex items-center gap-1">
                      <ActualIcon />
                      <p className="text-lg text-red-400 font-medium leading-none">
                        Актуальная
                      </p>
                    </div>
                  )}
                </div>
                <div
                  className="text-xl whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <div>
                  Автор:{' '}
                  <a
                    href={item.author}
                    target={'_blank'}
                    rel={'noreferrer'}
                    className="text-blue_light"
                  >
                    {item.author}
                  </a>
                </div>
                <ModList mods={item.mods} />
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
