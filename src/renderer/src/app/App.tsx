import { animated, useSpring } from '@react-spring/web';
import { FC } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import 'swiper/css';
import { appRoutes } from '../shared/router';
import { Layout } from '../shared/ui';
import './styles/index.css';

export const App: FC = () => {
  const location = useLocation();

  const springProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 170, friction: 26 },
    reset: true,
  });

  return (
    <Layout>
      <animated.div
        style={springProps}
        className="flex flex-col flex-grow root-animate"
      >
        <Routes location={location}>
          {appRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </animated.div>
    </Layout>
  );
};
