import React, { useState, useEffect } from 'react';
import useFetch from '@shared/hooks/useFetch';
import PopularTags from '@shared/PopularTags';
import FeedTogler from '@shared/FeedTogler';
import ArticleList from '../articleList/ArticleList';
import {
  StyledFeedContainer,
  StyledFeedContent,
  StyledSidebar,
} from './GlobalFeed.styled';
import { Article } from './types';

const GlobalFeed: React.FC = () => {
  const apiUrl = '/articles?limit=10&offset=0';
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [{ response, isLoading, error }, doFetch] = useFetch<Article[]>(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!response || response.length === 0) {
    return <div>No articles found.</div>;
  }

  return (
    <StyledFeedContainer>
      <StyledFeedContent>
        <FeedTogler selectedTag={selectedTag} onFeedChange={() => {}} />
        <h1>Global Feed</h1>
        <ArticleList articles={response} />
      </StyledFeedContent>
      <StyledSidebar>
        <PopularTags
          tags={['react', 'javascript', 'typescript', 'webdev', 'frontend']}
          selectedTag={selectedTag}
          onTagClick={setSelectedTag}
        />
      </StyledSidebar>
    </StyledFeedContainer>
  );
};

export default GlobalFeed;
