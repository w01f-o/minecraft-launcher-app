import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorMessage from './ErrorMessage';
import Background from '../../widgets/Background/Background';
import TitleBar from '../../widgets/TitleBar';

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

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
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
    this.setState({ hasError: true, error: { message: error, info: errorInfo } });
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <>
          <TitleBar />
          <div className="flex-grow grid place-items-center ">
            <Background />
            <div className="max-w-2xl custom-scrollbar overflow-y-auto">
              <div className="max-h-[70vh]">
                <ErrorMessage message={JSON.stringify(this.state.error)} />
              </div>
            </div>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
