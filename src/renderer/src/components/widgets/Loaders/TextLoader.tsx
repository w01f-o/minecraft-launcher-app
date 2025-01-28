import { FC, useEffect, useState } from 'react';

interface TextLoaderProps {
  text?: false;
}

const TextLoader: FC<TextLoaderProps> = ({ text = true }) => {
  const [dots, setDots] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 400);

    return (): void => {
      clearInterval(interval);
    };
  }, []);

  return (
    <span>
      {text && 'Загрузка'} {dots}
    </span>
  );
};

export default TextLoader;
