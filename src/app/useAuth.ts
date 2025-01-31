import { useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('email', user.email || '');
      } else {
        localStorage.removeItem('uid');
        localStorage.removeItem('email');
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useAuth;
