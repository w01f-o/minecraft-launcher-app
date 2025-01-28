import { FC } from 'react';
import { useGetCharacterQuery } from '../../services/character.api';
import CharacterCanvas from '../widgets/Character/CharacterCanvas';
import CharacterController from '../features/Character/CharacterController';
import ErrorMessage from '../features/Errors/ErrorMessage';
import DotsLoader from '@renderer/components/widgets/Loaders/DotsLoader';

const Character: FC = () => {
  const { isFetching, isLoading, isError, error } = useGetCharacterQuery(
    window.localStorage.getItem('hwid')!
  );

  if (isFetching || isLoading) {
    return (
      <div className="grid flex-grow place-items-center">
        <DotsLoader color="#85A2E8" secondaryColor="#85A2E8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid place-items-center flex-grow">
        <ErrorMessage message={JSON.stringify(error)} />
      </div>
    );
  }

  return (
    <div className="flex flex-grow items-center">
      <CharacterCanvas />
      <div className="w-1/2">
        <div className="flex flex-col gap-3 h-full">
          <CharacterController />
        </div>
      </div>
    </div>
  );
};

export default Character;
