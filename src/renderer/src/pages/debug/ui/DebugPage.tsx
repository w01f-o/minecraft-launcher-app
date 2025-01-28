import { useSettings } from '@/renderer/shared/lib';
import { ScrollShadow } from '@heroui/react';
import { FC, useEffect, useRef, useState } from 'react';

export const DebugPage: FC = () => {
  const [debugInfo, setDebugInfo] = useState<string[]>([
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dicta atque impedit quos dignissimos fugit illum pariatur, laboriosam corrupti esse dolorem, distinctio consequatur ea magnam consequuntur quam cupiditate. Officia, facilis.  Earum in quod itaque praesentium cum veniam, animi sed repellendus quos deserunt ipsa! Odio sequi nemo enim nulla porro dolores impedit possimus.',
  ]);
  const { isDebugMode } = useSettings();

  useEffect(() => {
    window.minecraft.debug({ isDebugMode, setDebugInfo });
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [debugInfo]);

  return (
    <ScrollShadow
      className="h-[70vh] custom-scrollbar"
      ref={scrollContainerRef}
      orientation="horizontal"
    >
      <div className="flex flex-col gap-2 pr-10">
        {debugInfo.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </ScrollShadow>
  );
};
