// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorContext } from './ErrorContext';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static contextType = ErrorContext;
  declare context: React.ContextType<typeof ErrorContext>;

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    if (this.context) {
      this.context.setErrorState(error, error.message);
    }
  }

  render() {
    if (this.state.hasError) {
      // ErrorModal will handle the display
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;