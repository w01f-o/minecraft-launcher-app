import { ChangeEvent, FC } from 'react';
import RangeInput from '../../shared/UI/RangeInput';
import { useSettings } from '../../../hooks/useSettings';
import Field from '../../shared/UI/Field';
import { useSpecs } from '../../../hooks/useSpecs';

const RamSetting: FC = () => {
  const { maxRam, setMaxRam } = useSettings();
  const { totalRam } = useSpecs();

  const fieldChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = +e.target.value * 1024 * 1024;
    if (value >= 0 && value <= totalRam!) {
      setMaxRam(value);
    }
  };

  return (
    <div>
      <RangeInput value={maxRam} min={0} max={totalRam} setValue={setMaxRam} />
      <div className="flex items-center text-xl gap-4 py-3 select-none">
        {maxRam !== null && totalRam !== null && (
          <>
            <Field
              value={Math.round(maxRam / 1024 / 1024)}
              onChange={fieldChangeHandler}
              type="text"
              minify
            />
          </>
        )}
        Мбайт
      </div>
    </div>
  );
};

export default RamSetting;
