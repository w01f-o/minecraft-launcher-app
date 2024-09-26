import { ChangeEvent, FC, FormEvent, useEffect, useMemo, useState } from 'react';
import Field from '../../shared/UI/Field';
import Button from '../../shared/UI/Button';
import ReadyIcon from '../../shared/Icons/ReadyIcon';
import { useMinecraft } from '../../../hooks/useMinecraft';
import { useUpdateCharacterMutation } from '../../../services/character.api';
import { useTransition, animated } from '@react-spring/web';

const CharacterNameChanger: FC = () => {
  const { username } = useMinecraft();
  const [updateCharacter, { isLoading }] = useUpdateCharacterMutation();
  const [inputLocalName, setInputLocalName] = useState<string | null>(null);

  useEffect(() => {
    if (username !== null) {
      setInputLocalName(username);
    }
  }, [username]);

  const inputLocalNameChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputLocalName(e.target.value);
  };

  const canBeChanged = useMemo(() => {
    return (
      inputLocalName !== null &&
      inputLocalName !== username &&
      username !== null &&
      inputLocalName !== ''
    );
  }, [inputLocalName, username]);

  const submitChangeNameHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!canBeChanged) return;

    const formData = new FormData();
    formData.append('hwid', window.localStorage.getItem('hwid')!);
    formData.append('username', inputLocalName!);

    updateCharacter(formData);
  };

  const changeButtonTransition = useTransition(canBeChanged, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 100 },
  });

  return (
    <>
      <div className="text-2xl">Имя персонажа:</div>
      <form className="flex items-center gap-4" onSubmit={submitChangeNameHandler}>
        <Field
          value={inputLocalName ?? ''}
          onChange={inputLocalNameChangeHandler}
          className="w-[80%]"
        />
        {changeButtonTransition(
          (props, canBeChanged) =>
            canBeChanged && (
              <animated.div style={props}>
                <Button role={'primary'} minify isPending={isLoading}>
                  <ReadyIcon />
                </Button>
              </animated.div>
            ),
        )}
      </form>
    </>
  );
};

export default CharacterNameChanger;
