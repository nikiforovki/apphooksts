import React, { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../context/curentUser';
import { User, CurrentUserCheckerProps } from './type';

const CurrentUserChecker = ({ children }: CurrentUserCheckerProps) => {
  const { setCurrentUser } = useContext(CurrentUserContext) || {};

  useEffect(() => {
    const keys: (keyof User)[] = ['email', 'name', 'uid'];
    const userData: Partial<User> = {};
    let hasData = false;

    keys.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value !== null && value !== 'undefined' && value !== 'null') {
        try {
          if (value.startsWith('{') || value.startsWith('"')) {
            userData[key] = JSON.parse(value);
          } else {
            userData[key] = value;
          }
          hasData = true;
        } catch (error) {
          console.error(
            `Ошибка при парсинге данных для ключа "${key}":`,
            error,
          );
        }
      }
    });

    if (setCurrentUser) {
      if (hasData) {
        setCurrentUser(userData as User);
      } else {
        setCurrentUser(null);
      }
    } else {
      console.error('setCurrentUser не определен в контексте.');
    }
  }, [setCurrentUser]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default CurrentUserChecker;
