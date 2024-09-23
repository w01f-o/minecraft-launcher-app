import { FC, ReactNode, useEffect } from 'react'
import { useSpecs } from '../../hooks/useSpecs'
import { useSettings } from '../../hooks/useSettings'

interface SpecsProviderProps {
  children: ReactNode
}

const SpecsProvider: FC<SpecsProviderProps> = ({ children }) => {
  const { totalRam, setTotalRam } = useSpecs()
  const { setMaxRam } = useSettings()

  useEffect(() => {
    if (totalRam === null) {
      const totalRam = window.utils.getMemory()
      setTotalRam(Math.round(totalRam))
      setMaxRam(Math.round(totalRam * 0.7))
    }
  }, [])

  return children
}

export default SpecsProvider
