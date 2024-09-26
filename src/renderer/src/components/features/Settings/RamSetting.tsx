import { ChangeEvent, FC, useMemo } from 'react';
import RangeInput from '../../shared/UI/RangeInput';
import { useSettings } from '../../../hooks/useSettings';
import Field from '../../shared/UI/Field';
import { useSpecs } from '../../../hooks/useSpecs';
import clsx from 'clsx';
import { useTransition, animated } from '@react-spring/web';

const RamSetting: FC = () => {
  const { maxRam, setMaxRam } = useSettings();
  const { totalRam } = useSpecs();

  const fieldChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value * 1024 * 1024;
    if (value >= 0 && value <= totalRam!) {
      setMaxRam(value);
    }
  };

  const ramWarning = useMemo(() => maxRam! <= 2147483648, [maxRam]);
  const textRamWarningTransition = useTransition(ramWarning, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 100 },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className={'text-lg'}>Выделение памяти:</div>
      <RangeInput
        value={maxRam}
        min={0}
        max={totalRam}
        setValue={setMaxRam}
        accentColor={ramWarning ? '#f87171' : undefined}
      />
      <div className="flex items-center text-xl gap-4 select-none">
        {maxRam !== null && totalRam !== null && (
          <>
            <Field
              value={Math.round(maxRam / 1024 / 1024)}
              onChange={fieldChangeHandler}
              type="text"
              minify
              className={clsx({
                'bg-red-400 focus:ring-red-500': ramWarning,
              })}
            />
          </>
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
              <animated.div style={props} className="text-sm self-end text-red-400">
                *Не рекомендуется устанавливать слишком маленькое значение
              </animated.div>
            ),
        )}
      </div>
    </div>
  );
};

export default RamSetting;
