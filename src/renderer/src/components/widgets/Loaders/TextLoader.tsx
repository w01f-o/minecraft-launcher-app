import { FC, useEffect, useState } from 'react';

const TextLoader: FC = () => {
  const [dots, setDots] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 400);

    return (): void => {
      clearInterval(interval);
    };
  }, []);

  return <span>Загрузка {dots}</span>;
};

export default TextLoader;
