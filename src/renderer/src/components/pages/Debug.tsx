import { FC, useEffect, useRef, useState } from 'react';
import { useSettings } from '../../hooks/useSettings';

const Debug: FC = () => {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
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
    <div
      className="custom-scrollbar overflow-y-auto max-h-[70vh]"
      ref={scrollContainerRef}
    >
      <div className="flex flex-col gap-2">
        {debugInfo.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default Debug;
