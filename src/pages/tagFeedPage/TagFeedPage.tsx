import React from 'react';
import { useParams } from 'react-router-dom';
import Feed from '@features/Feed';

const TagFeedPage: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  return <Feed feedType="global" selectedTag={tag} />;
};

export default TagFeedPage;
