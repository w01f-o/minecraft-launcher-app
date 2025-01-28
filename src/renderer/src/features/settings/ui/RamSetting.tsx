import { useSettings } from '@/renderer/shared/lib';
import { Input, Slider } from '@heroui/react';
import { animated, useTransition } from '@react-spring/web';
import clsx from 'clsx';
import { ChangeEvent, FC } from 'react';

export const RamSetting: FC = () => {
  const { maxRam, setMaxRam } = useSettings();
  const totalRam = Number(window.localStorage.getItem('totalRam')!);

  const fieldChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value * 1024 * 1024;

    console.log(value >= 2147483648);
    console.log(value <= totalRam!);

    if (value >= 2147483648 && value <= totalRam!) {
      setMaxRam(value);
    }
  };

  const ramWarning = maxRam! <= 2147483648;
  const textRamWarningTransition = useTransition(ramWarning, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 100 },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className={'text-xl'}>Выделение памяти:</div>
      <Slider
        minValue={2147483648}
        maxValue={totalRam}
        value={maxRam ?? 0}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onChange={setMaxRam}
        aria-label="Ram slider"
        // accentColor={ramWarning ? '#f87171' : undefined}
      />
      <div className="flex items-center text-xl gap-4 select-none">
        {maxRam !== null && totalRam !== null && (
          <Input
            value={String(Math.round(maxRam / 1024 / 1024))}
            onChange={fieldChangeHandler}
            type="text"
            color={ramWarning ? 'danger' : undefined}
            isDisabled
            className="w-40 shadow-md rounded-2xl"
            size="lg"
          />
        )}
        <span
          className={clsx('transition', {
            'text-red-400': ramWarning,
          })}
        >
          Мбайт
        </span>
        {textRamWarningTransition(
          (props, ramWarning) =>
            ramWarning && (
              <animated.div
                style={props}
                className="text-sm self-end text-red-400"
              >
                *Не рекомендуется устанавливать слишком маленькое значение
              </animated.div>
            )
        )}
      </div>
    </div>
  );
};
