import {useEffect, useState} from 'react';

import {getUser} from '@/api/requests/users';

export const useUserName = (uid: string) => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(uid);
      setUserName(user.displayName);
    };
    fetchUser();
  }, [uid]);

  return userName;
};
