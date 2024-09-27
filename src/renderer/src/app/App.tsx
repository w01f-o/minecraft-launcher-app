import { FC } from 'react';
import './styles/index.css';
import 'swiper/css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/pages/Layout';
import { routes } from '../constants/routes';
import { ErrorBoundary } from '@renderer/components/features/Errors/ErrorBoundary';
import RootProvider from '@renderer/app/providers/RootProvider';

const App: FC = () => {
  return (
    <ErrorBoundary>
      <RootProvider>
        <Layout>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Layout>
      </RootProvider>
    </ErrorBoundary>
  );
};

export default App;
