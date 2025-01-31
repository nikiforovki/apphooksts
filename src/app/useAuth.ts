import { useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Пользователь авторизован:', user);
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('email', user.email || '');
      } else {
        console.log('Пользователь не авторизован');
        localStorage.removeItem('uid');
        localStorage.removeItem('email');
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useAuth;


