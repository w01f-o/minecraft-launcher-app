import { TitleBar } from '@/renderer/widgets/titlebar';
import log from 'electron-log/renderer';
import { Component, ErrorInfo, ReactNode } from 'react';
import Background from '../../layouts/Background';
import { ErrorMessage } from './ErrorMessage';

type ErrorBoundaryState =
  | {
      hasError: true;
      error: {
        message: Error;
        info: ErrorInfo | null;
      };
    }
  | {
      hasError: false;
    };

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(err: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: {
        message: err,
        info: null,
      },
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      hasError: true,
      error: { message: error, info: errorInfo },
    });
    log.error('Uncaught error:', error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <>
          <TitleBar />
          <div className="flex-grow grid place-items-center ">
            <Background />
            <div className="flex flex-col gap-4">
              <ErrorMessage />
            </div>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
