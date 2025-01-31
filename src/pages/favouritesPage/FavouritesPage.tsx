import React, { useEffect, useState } from 'react';
import { getArticles, unfavoriteArticle } from '@shared/api';
import { Article } from './type';
import UserFeedToggler from '@shared/UserFeedToggler';
import {
  StyledContainer,
  StyledAuthorImage,
  StyledInfo,
  StyledAuthorName,
  StyledDate,
  StyledArticleContainer,
  StyledArticleTitle,
  StyledArticleDescription,
  StyledButtonContainer,
  StyledActionButton,
} from './FavouritesPage.styled';

const FavouritesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleFeedChange = (feedType: string, tag?: string) => {
    if (tag) {
      setSelectedTag(tag);
    } else {
      setSelectedTag(null);
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        const favoriteArticles = data.filter(
          (article: Article) => article.favorited,
        );
        setArticles(favoriteArticles);
      } catch (error) {
        setError('Ошибка при загрузке статей');
        console.error('Ошибка при загрузке статей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleUnfavoriteArticle = async (slug: string) => {
    try {
      await unfavoriteArticle(slug);

      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.slug !== slug),
      );
    } catch (err) {
      console.error('Ошибка при удалении из избранного:', err);
    }
  };

  if (loading) {
    return <div>Загрузка статей...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <StyledContainer>
      <UserFeedToggler
        selectedTag={selectedTag}
        onFeedChange={handleFeedChange}
      />
      {articles.map((article) => (
        <StyledArticleContainer key={article.slug}>
          <StyledInfo>
            <StyledAuthorImage
              src={article.author.image}
              alt={article.author.username}
            />
            <StyledAuthorName to={`/profiles/${article.author.username}`}>
              {article.author.username}
            </StyledAuthorName>
            <StyledDate>
              {new Date(article.createdAt || '').toDateString()}
            </StyledDate>
          </StyledInfo>
          <StyledArticleTitle>{article.title}</StyledArticleTitle>
          <StyledArticleDescription>
            {article.description}
          </StyledArticleDescription>
          <StyledButtonContainer>
            <StyledActionButton
              onClick={() => handleUnfavoriteArticle(article.slug)}
            >
              Убрать из избранного
            </StyledActionButton>
          </StyledButtonContainer>
        </StyledArticleContainer>
      ))}
    </StyledContainer>
  );
};

export default FavouritesPage;
