import { appRoutes } from '@/renderer/shared/router';
import clsx from 'clsx';
import { FC, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const NavBar: FC = () => {
  const [activeBarPosition, setActiveBarPosition] = useState<number | null>(16);
  const location = useLocation();

  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const linkEl = document.querySelector(`a[href="#${location.pathname}"]`);

    if (linkEl && listRef.current) {
      const { left } = linkEl.getBoundingClientRect();
      setActiveBarPosition(left - listRef.current.getBoundingClientRect().left);
    } else {
      setActiveBarPosition(null);
    }
  }, [location]);

  return (
    <nav>
      <ul
        className="flex relative gap-4 items-center py-3 px-4 bg-white rounded-3xl mb-6 z-20"
        ref={listRef}
      >
        <div
          className="bg-blue_light absolute h-10 w-32 rounded-2xl top-1/2 -translate-y-1/2 z-0 pointer-events-none transition-all"
          style={{
            left: `${activeBarPosition}px`,
            opacity: activeBarPosition === null ? 0 : 1,
          }}
        ></div>
        {appRoutes.map(
          route =>
            route.isNavBar && (
              <li key={route.path}>
                <NavLink
                  to={route.path}
                  className={clsx(
                    'relative z-10 flex items-center justify-center rounded-xl h-10 w-32 before:absolute before:inset-0 before:transition before:opacity-[.05] hover:before:bg-black before:rounded-2xl select-none'
                  )}
                  draggable={false}
                >
                  {route.title}
                </NavLink>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};
