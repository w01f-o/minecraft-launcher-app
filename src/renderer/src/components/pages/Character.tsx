import { FC } from 'react';
import { useGetCharacterQuery } from '../../services/character.api';
import { MutatingDots } from 'react-loader-spinner';
import CharacterCanvas from '../widgets/Character/CharacterCanvas';
import CharacterController from '../features/Character/CharacterController';
import ErrorMessage from '../features/Errors/ErrorMessage';

const Character: FC = () => {
  const { isFetching, isLoading, isError, error } = useGetCharacterQuery(
    window.localStorage.getItem('hwid')!,
  );

  if (isFetching || isLoading) {
    return (
      <div className="grid flex-grow place-items-center">
        <MutatingDots
          color="#85A2E8"
          wrapperClass="justify-center"
          secondaryColor="#85A2E8"
          width={100}
          height={100}
        />
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
