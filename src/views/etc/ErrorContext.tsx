import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ErrorState {
  error: Error | null;
  message: string;
}

interface ErrorContextType {
  errorState: ErrorState;
  setErrorState: (error: Error | null, message?: string) => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [errorState, setErrorStateInternal] = useState<ErrorState>({ error: null, message: '' });

  const setErrorState = (error: Error | null, message?: string) => {
    setErrorStateInternal({
      error,
      message: message || (error ? 'An unexpected error occurred' : ''),
    });
  };

  return (
    <ErrorContext.Provider value={{ errorState, setErrorState }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};