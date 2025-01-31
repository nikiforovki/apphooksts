import React, { useContext } from 'react';
import { CurrentUserContext } from '@shared/CurentUser';
import Feed from '@features/Feed';
import SignIn from '@pages/SignIn';

const MyFeedPage: React.FC = () => {
  const context = useContext(CurrentUserContext);

  if (!context || !context.currentUser) {
    return <SignIn />;
  }

  const { currentUser } = context;

  console.log(currentUser);

  return <Feed feedType="my-feed" userId={currentUser.uid} />;
};

export default MyFeedPage;
