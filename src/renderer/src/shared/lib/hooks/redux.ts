import { AppDispatch, RootState } from '@/renderer/app/stores/store';
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
