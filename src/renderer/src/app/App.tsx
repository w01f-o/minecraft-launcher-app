import { FC } from 'react';
import './styles/index.css';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/pages/Home';
import Settings from '../components/pages/Settings';
import RootProvider from './providers/RootProvider';
import Layout from '../components/pages/Layout';

const App: FC = () => {
  return (
    <RootProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </RootProvider>
  );
};

export default App;
