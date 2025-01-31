import React from 'react';
import ArticlePreview from './ArticlePreview';
import { Article } from '../type';

interface FeedContentProps {
  articles: Article[];
  userId?: string;
  feedType: string;
  handleFavorite: (slug: string) => void;
  handleUnfavorite: (slug: string) => void;
  handleDeleteArticle: (slug: string) => void;
}

const FeedContent: React.FC<FeedContentProps> = ({
  articles,
  userId,
  feedType,
  handleFavorite,
  handleUnfavorite,
  handleDeleteArticle,
}) => {
  return (
    <div>
      {articles.map((article) => (
        <ArticlePreview
          key={article.slug}
          article={article}
          userId={userId}
          feedType={feedType}
          handleFavorite={handleFavorite}
          handleUnfavorite={handleUnfavorite}
          handleDeleteArticle={handleDeleteArticle}
        />
      ))}
    </div>
  );
};

export default FeedContent;
