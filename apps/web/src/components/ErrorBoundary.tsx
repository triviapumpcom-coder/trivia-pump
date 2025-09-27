import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="rounded-2xl bg-red-500/20 border border-red-400/50 p-4 text-center">
          <div className="text-red-400 text-lg mb-2">⚠️ Component Error</div>
          <div className="text-red-300 text-sm">
            {this.state.error?.message || 'Something went wrong'}
          </div>
          <button 
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="mt-2 px-3 py-1 bg-red-500/30 text-red-300 rounded text-xs hover:bg-red-500/40"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
