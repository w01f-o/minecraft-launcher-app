import { FC } from 'react';
import './styles/index.css';
import 'swiper/css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '../components/pages/Layout';
import { routes } from '../constants/routes';
import { animated, useSpring } from '@react-spring/web';

const App: FC = () => {
  const location = useLocation();

  const springProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 170, friction: 26 },
    reset: true,
  });

  return (
    <Layout>
      <animated.div style={springProps} className="flex flex-col flex-grow root-animate">
        <Routes location={location}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </animated.div>
    </Layout>
  );
};

export default App;
