import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from '../shared/ui';
import { App } from './App';
import { RootProvider } from './providers/RootProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <RootProvider>
      <App />
    </RootProvider>
  </ErrorBoundary>
);
