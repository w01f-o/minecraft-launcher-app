import ReactDOM from 'react-dom/client';
import App from './app/App';
import { ErrorBoundary } from '@renderer/components/features/Errors/ErrorBoundary';
import RootProvider from '@renderer/app/providers/RootProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <RootProvider>
      <App />
    </RootProvider>
  </ErrorBoundary>,
);
