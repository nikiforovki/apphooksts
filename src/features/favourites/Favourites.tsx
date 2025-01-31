import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledFavouritesContainer,
  StyledArticlePreview,
  StyledArticleMeta,
  StyledAuthorImage,
  StyledInfo,
  StyledAuthorName,
  StyledDate,
  StyledPreviewLink,
  StyledArticleTitle,
  StyledArticleDescription,
  StyledTagList,
  StyledTag,
} from './Favourites.styled';
import { FavouritesProps } from './type';

const Favourites: React.FC<FavouritesProps> = ({ articles }) => {
  if (!articles) {
    return <div>Статьи не загружены.</div>;
  }

  const favoritedArticles = JSON.parse(
    localStorage.getItem('favoritedArticles') || '{}',
  );

  const filteredArticles = articles.filter(
    (article) => favoritedArticles[article.slug || ''],
  );

  return (
    <StyledFavouritesContainer>
      {filteredArticles.length > 0 ? (
        filteredArticles.map((article) => (
          <StyledArticlePreview key={article.slug}>
            <StyledArticleMeta>
              <Link to={`/profiles/${article.author.username}`}>
                <StyledAuthorImage
                  src={article.author.image}
                  alt={article.author.username}
                />
              </Link>
              <StyledInfo>
                <StyledAuthorName to={`/profiles/${article.author.username}`}>
                  {article.author.username}
                </StyledAuthorName>
                <StyledDate>
                  {new Date(article.createdAt || '').toDateString()}
                </StyledDate>
              </StyledInfo>
            </StyledArticleMeta>
            <StyledPreviewLink to={`/articles/${article.slug}`}>
              <StyledArticleTitle>{article.title}</StyledArticleTitle>
              <StyledArticleDescription>
                {article.description}
              </StyledArticleDescription>
              <span>Читать далее...</span>
              <StyledTagList>
                {article.tagList?.map((tag) => (
                  <StyledTag key={tag}>{tag}</StyledTag>
                ))}
              </StyledTagList>
            </StyledPreviewLink>
          </StyledArticlePreview>
        ))
      ) : (
        <div>Нет избранных статей.</div>
      )}
    </StyledFavouritesContainer>
  );
};

export default Favourites;
