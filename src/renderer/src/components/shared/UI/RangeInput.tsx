import { FC, useEffect, useRef } from 'react';

interface RangeInputProps {
  value: number | null;
  setValue: (value: number) => void;
  min: number;
  max: number | null;
  accentColor?: string;
}

const RangeInput: FC<RangeInputProps> = ({ min, max, setValue, accentColor, value }) => {
  const rangeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setValueToElement = (e: MouseEvent): void => {
      if (rangeRef.current && max !== null) {
        const rect = rangeRef.current.getBoundingClientRect();
        const x = Math.min(Math.max(e.clientX - rect.x, 0), rect.width);
        const newValue = Math.round(Math.floor((x / rect.width) * max));

        newValue >= min && setValue(Math.round(Math.floor((x / rect.width) * max)));
      }
    };

    const mouseMoveHandler = (e: MouseEvent): void => {
      setValueToElement(e);
    };

    const mouseUpHandler = (): void => {
      if (rangeRef.current) {
        document.removeEventListener('mousemove', mouseMoveHandler);
      }
    };

    const mouseDownHandler = (e: MouseEvent): void => {
      if (rangeRef.current && max !== null) {
        document.addEventListener('mousemove', mouseMoveHandler);

        setValueToElement(e);

        document.addEventListener('mouseup', mouseUpHandler, {
          once: true,
        });
      }
    };

    if (rangeRef.current) {
      rangeRef.current.addEventListener('mousedown', mouseDownHandler);
    }

    return (): void => {
      if (rangeRef.current) {
        rangeRef.current.removeEventListener('mousedown', mouseDownHandler);
      }
    };
  }, [max, value]);

  return (
    <div className="h-2 w-full">
      <div
        className="relative shadow-sm w-full h-2 bg-white rounded-3xl cursor-pointer"
        ref={rangeRef}
      >
        <div
          className="absolute h-2 left-0 bg-blue rounded-3xl transition"
          style={{
            width: `${value === null && max === null ? 0 : (value! / max!) * 100}%`,
            backgroundColor: accentColor,
          }}
        ></div>
        <div
          className="absolute top-1/2 translate-y-[-50%] rounded-full bg-blue w-5 h-5 transition"
          style={{
            left: `calc(${value === null && max === null ? 0 : (value! / max!) * 100}% - 10px)`,
            backgroundColor: accentColor,
          }}
        ></div>
      </div>
    </div>
  );
};

export default RangeInput;
