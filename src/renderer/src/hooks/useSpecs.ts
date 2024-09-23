import { useAppDispatch, useAppSelector } from './redux'
import { setTotalRam as setTotalRamAction } from '../store/reducers/specsSlice'

type useSpecsReturn = {
  totalRam: number | null
  setTotalRam: (value: number) => void
}

export const useSpecs = (): useSpecsReturn => {
  const dispatch = useAppDispatch()
  const { totalRam } = useAppSelector((state) => state.specs)

  const setTotalRam = (value: number): void => {
    dispatch(setTotalRamAction(value))
  }

  return {
    totalRam,
    setTotalRam
  }
}
