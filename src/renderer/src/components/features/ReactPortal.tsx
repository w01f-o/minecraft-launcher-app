'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ReactPortalProps {
  children: ReactNode;
}

const ReactPortal: FC<ReactPortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const element = document.querySelector('#root-portal');

  if (!element) {
    return null;
  }

  return createPortal(children, element);
};

export default ReactPortal;
