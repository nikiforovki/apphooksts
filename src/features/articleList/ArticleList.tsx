import React from 'react';
import AddToFavorites from '../addToFavorites/AddToFavorites';
import {
  StyledArticleContainer,
  StyledArticleTitle,
  StyledArticleBody,
  StyledReadMoreLink,
  StyledAuthorInfo,
  StyledAuthorName,
  StyledArticleDate,
} from './ArticleList.styled';

import { ArticleListProps } from './type';

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => (
        <StyledArticleContainer key={article.slug}>
          <StyledArticleTitle>{article.title}</StyledArticleTitle>
          <StyledArticleBody>
            {article.body.substring(0, 100)}...
          </StyledArticleBody>
          <StyledReadMoreLink href={`/article/${article.slug}`}>
            Read more...
          </StyledReadMoreLink>
          <StyledAuthorInfo>
            <StyledAuthorName>{article.author.username}</StyledAuthorName>
            <StyledArticleDate>
              {new Date(article.createdAt).toLocaleDateString()}
            </StyledArticleDate>
          </StyledAuthorInfo>
          <AddToFavorites
            isFavorited={article.favorited}
            favoritesCount={article.favoritesCount}
            articleSlug={article.slug}
          />
        </StyledArticleContainer>
      ))}
    </div>
  );
};

export default ArticleList;
