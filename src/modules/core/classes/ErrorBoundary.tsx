import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  errorComponent: Error | null;
  errorComInfo: React.ErrorInfo | null;
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.errorComponent = null;
    this.errorComInfo = null;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Actualiza el estado para que el próximo renderizado muestre la UI alternativa.
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    this.errorComponent = error;
    this.errorComInfo = errorInfo;
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI alternativa
      return <p>{this.errorComponent?.stack}</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
