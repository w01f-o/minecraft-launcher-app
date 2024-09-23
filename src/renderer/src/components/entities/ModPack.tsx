import { FC } from 'react'
import type { ModPack as ModPackType } from '../../types/ModPack.type'
import clsx from 'clsx'
import { useMinecraft } from '../../hooks/useMinecraft'

interface ModPackProps {
  item: ModPackType
  isCurrent: boolean
}

const ModPack: FC<ModPackProps> = ({ item, isCurrent }) => {
  const { setCurrentModPack } = useMinecraft()
  const clickHandler = (): void => {
    setCurrentModPack(item)
  }

  return (
    <div
      className={clsx(
        'flex items-center gap-6 border-4  bg-white rounded-2xl py-4 px-6 h-40 cursor-pointer transition',
        {
          'border-white': !isCurrent,
          'border-blue': isCurrent
        }
      )}
      onClick={clickHandler}
    >
      <div className="w-[110px] h-[110px]">
        <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <div className="text-gray">Сборка</div>
        <div className="text-2xl">{item.name}</div>
        <div>{item.version}</div>
        <div className="">{item.description}</div>
      </div>
    </div>
  )
}

export default ModPack
