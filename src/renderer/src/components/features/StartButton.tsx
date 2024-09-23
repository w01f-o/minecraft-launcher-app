import { FC, useState } from 'react'
import Button from '../shared/UI/Button'
import { useSettings } from '../../hooks/useSettings'

const StartButton: FC = () => {
  const { isFullscreen } = useSettings()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const clickHandler = (): void => {
    setIsLoading(true)
    window.minecraft.start({ fullscreen: isFullscreen, setIsLoading })
  }

  return (
    <Button
      role={'primary'}
      className="self-end w-60 z-20"
      onClick={clickHandler}
      isPending={isLoading}
    >
      Играть
    </Button>
  )
}

export default StartButton
