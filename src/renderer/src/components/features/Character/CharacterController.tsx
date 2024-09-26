import { FC } from 'react';
import CharacterNameChanger from './CharacterNameChanger';
import CharacterSkinCapeChanger from './CharacterSkinCapeChanger';

interface CharacterControllerProps {}

const CharacterController: FC<CharacterControllerProps> = ({}) => {
  return (
    <>
      <CharacterNameChanger />
      <CharacterSkinCapeChanger />
    </>
  );
};

export default CharacterController;
