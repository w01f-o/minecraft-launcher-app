import {
  removeFromDownloadQueueAction,
  setDownloadQueueAction,
  updateDownloadStatusAction,
} from '@/renderer/app/stores/reducers/downloadQueueSlice';
import { QueueItem } from '@/renderer/entities/modpack';
import { useAppDispatch, useAppSelector } from './redux';

interface UseDownloadQueueReturn {
  item: QueueItem | null;
  set: (params: Omit<QueueItem, 'downloadStatus'>) => void;
  remove: () => void;
  update: (params: QueueItem) => void;
}

type UseDownloadQueue = () => UseDownloadQueueReturn;

export const useDownloadQueue: UseDownloadQueue = () => {
  const { downloadQueue: item } = useAppSelector(state => state.downloadQueue);
  const dispatch = useAppDispatch();

  const setDownloadQueue = ({
    modpackId,
    directory,
  }: Omit<QueueItem, 'downloadStatus'>): void => {
    dispatch(setDownloadQueueAction({ directory, modpackId }));
  };

  const removeFromDownloadQueue = (): void => {
    dispatch(removeFromDownloadQueueAction());
  };

  const updateDownloadStatus = (params: QueueItem): void => {
    dispatch(updateDownloadStatusAction(params));
  };

  return {
    item,
    set: setDownloadQueue,
    remove: removeFromDownloadQueue,
    update: updateDownloadStatus,
  };
};
