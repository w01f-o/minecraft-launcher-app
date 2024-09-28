import { ToastItem } from '@renderer/types/ToastItem.type';
import { useAppDispatch, useAppSelector } from '@renderer/hooks/redux';
import { addToastAction, removeToastAction } from '@renderer/store/reducers/toastSlice';

type useToastReturn = {
  items: ToastItem[];
  add: (item: Omit<ToastItem, 'id'>) => void;
  remove: (id: string) => void;
};

export const useToast = (): useToastReturn => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.toast);

  const add = (item: Omit<ToastItem, 'id'>): void => {
    dispatch(addToastAction(item));
  };

  const remove = (id: string): void => {
    dispatch(removeToastAction(id));
  };

  return {
    items,
    add,
    remove,
  };
};
