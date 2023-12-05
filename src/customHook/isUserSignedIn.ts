import { useState, useCallback, useEffect } from 'react';

const useAuthentication = () => {
  // Try to get the initial value from local storage, default to false if not present
  const storedIsUserSignedIn = localStorage.getItem('isUserSignedIn');
  const initialIsUserSignedIn = storedIsUserSignedIn ? JSON.parse(storedIsUserSignedIn) : false;

  const [isUserSignedIn, setIsUserSignedIn] = useState(initialIsUserSignedIn);

  const signIn = useCallback(() => {
    setIsUserSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    setIsUserSignedIn(false);
  }, []);

  // Update local storage whenever isUserSignedIn changes
  useEffect(() => {
    localStorage.setItem('isUserSignedIn', JSON.stringify(isUserSignedIn));
  }, [isUserSignedIn]);

  return {
    isUserSignedIn,
    signIn,
    signOut,
  };
};

export default useAuthentication;
