import React from 'react';
import Feed from '@features/Feed';

const GlobalFeedPage: React.FC = () => {
  return (
    <div>
      <Feed feedType="global" />
    </div>
  );
};

export default GlobalFeedPage;
