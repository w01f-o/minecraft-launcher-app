import { FC } from 'react';
import errorGif from '../../../../../../resources/sad-azolotl.gif';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = () => {
  return (
    <div className="flex flex-col items-center gap-2 text-center min-w-96">
      <div>
        <img src={errorGif} alt="" />
      </div>
      <div className="text-3xl font-bold">Что-то пошло не так 😔</div>
      {/*{message && <div>{message}</div>}*/}
    </div>
  );
};

export default ErrorMessage;
