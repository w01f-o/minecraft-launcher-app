import { FC } from 'react';
import CharacterNameChanger from './CharacterNameChanger';
import CharacterSkinCapeChanger from './CharacterSkinCapeChanger';

const CharacterController: FC = () => {
  return (
    <>
      <CharacterNameChanger />
      <CharacterSkinCapeChanger />
    </>
  );
};

export default CharacterController;
