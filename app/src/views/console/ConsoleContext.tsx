import React, { createContext, useContext, useState } from 'react';
import { AdminModel } from '../../orm/declarations/admins';

export type ConsoleContextType = {
  admin?: AdminModel;
  setAdmin: React.Dispatch<React.SetStateAction<AdminModel | undefined>>;
};

export const ConsoleContext = createContext<ConsoleContextType>({
  admin: undefined,
  setAdmin: () => { },
});

type ConsoleContextProviderProps = {
  children: React.ReactNode;
};

/**
 * Provides a context for the global data in the console view including current admin user.
 * @param children The child components to be wrapped by the context provider.
 * @returns A JSX element that provides the admin state context.
 */
export const ConsoleContextProvider = ({ children }: ConsoleContextProviderProps) => {
  const [admin, setAdmin] = useState<AdminModel>();

  return (
    <ConsoleContext.Provider value={{ admin, setAdmin }}>
      {children}
    </ConsoleContext.Provider>
  );
};

export const useConsoleData = () => useContext(ConsoleContext);

