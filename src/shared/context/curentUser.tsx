import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  uid: string;
}

interface CurrentUserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const CurrentUserContext = createContext<CurrentUserContextType | null>(
  null,
);

interface CurrentUserProviderProps {
  children: ReactNode;
}

export const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
