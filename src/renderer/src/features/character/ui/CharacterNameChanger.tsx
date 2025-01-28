import { useUpdateCharacterMutation } from '@/renderer/entities/character';
import { useMinecraft } from '@/renderer/shared/lib';
import { ReadyIcon } from '@/renderer/shared/ui';
import { Button, Input } from '@heroui/react';
import { animated, useTransition } from '@react-spring/web';
import log from 'electron-log/renderer';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const CharacterNameChanger: FC = () => {
  const {
    user: { name },
  } = useMinecraft();
  const [updateCharacter, { isLoading }] = useUpdateCharacterMutation();
  const [inputLocalName, setInputLocalName] = useState<string | null>(null);

  useEffect(() => {
    if (name !== null) {
      setInputLocalName(name);
    }
  }, [name]);

  const inputLocalNameChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setInputLocalName(e.target.value);
  };

  const canBeChanged =
    inputLocalName !== null &&
    inputLocalName !== name &&
    name !== null &&
    inputLocalName !== '';

  const submitChangeNameHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!canBeChanged) return;

    const formData = new FormData();
    formData.append('hwid', window.localStorage.getItem('hwid')!);
    formData.append('username', inputLocalName!);

    try {
      await updateCharacter(formData).unwrap();

      toast.success('Имя персонажа успешно изменено');
      log.debug(`Character name changed from ${name} to ${inputLocalName}`);
    } catch (e) {
      toast.error('Произошла ошибка при изменении имени персонажа');
      log.error('Error while changing character name', e);
    }
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
      <form
        className="flex items-center gap-4"
        onSubmit={submitChangeNameHandler}
      >
        <Input
          value={inputLocalName ?? ''}
          onChange={inputLocalNameChangeHandler}
          size="lg"
          className="max-w-[400px]"
        />
        {changeButtonTransition(
          (props, canBeChanged) =>
            canBeChanged && (
              <animated.div style={props}>
                <Button
                  isLoading={isLoading}
                  isIconOnly
                  size="lg"
                  color="primary"
                >
                  <ReadyIcon />
                </Button>
              </animated.div>
            )
        )}
      </form>
    </>
  );
};
