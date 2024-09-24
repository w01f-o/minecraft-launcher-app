import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from '../../store/store';
import { PersistGate } from 'redux-persist/integration/react';

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
