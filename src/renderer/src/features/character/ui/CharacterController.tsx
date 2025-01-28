import { FC } from 'react';
import { CharacterNameChanger } from './CharacterNameChanger';
import { CharacterSkinCapeChanger } from './CharacterSkinCapeChanger';

export const CharacterController: FC = () => {
  return (
    <>
      <CharacterNameChanger />
      <CharacterSkinCapeChanger />
    </>
  );
};
