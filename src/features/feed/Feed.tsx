import React, { useEffect, useState } from 'react';
import {
  StyledFeedContainer,
  StyledFeedContent,
  StyledSidebar,
} from './Feed.styled';
import FeedTogler from '@shared/FeedTogler';
import FeedContentComponent from './components/FeedContent';
import FeedSidebar from './components/FeedSidebar';
import { Article, FeedProps } from './type';
import {
  getArticles,
  favoriteArticle,
  unfavoriteArticle,
  deleteArticle,
} from '../../shared/api/api';
import Pagination from '@shared/pagination/Pagination';

const Feed: React.FC<FeedProps> = ({ feedType, selectedTag, userId }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(10);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getArticles();

      let filteredData = data;

      if (feedType === 'my-feed' && userId) {
        filteredData = data.filter((article) => article.author.uid === userId);
      } else if (feedType === 'tag' && selectedTag) {
        filteredData = data.filter((article) =>
          article.tagList.includes(selectedTag),
        );
      }

      const paginatedData = filteredData.slice(
        (currentPage - 1) * articlesPerPage,
        currentPage * articlesPerPage,
      );

      setArticles(paginatedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (slug: string) => {
    try {
      const updatedArticle = await favoriteArticle(slug);
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.slug === slug
            ? {
                ...article,
                favorited: updatedArticle.favorited,
                favoritesCount: updatedArticle.favoritesCount,
              }
            : article,
        ),
      );
    } catch (err) {
      console.error('Ошибка при добавлении в избранное:', err);
    }
  };

  const handleUnfavorite = async (slug: string) => {
    try {
      const updatedArticle = await unfavoriteArticle(slug);
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.slug === slug
            ? {
                ...article,
                favorited: updatedArticle.favorited,
                favoritesCount: updatedArticle.favoritesCount,
              }
            : article,
        ),
      );
    } catch (err) {
      console.error('Ошибка при удалении из избранного:', err);
    }
  };

  const handleDeleteArticle = async (slug: string) => {
    try {
      await deleteArticle(slug);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.slug !== slug),
      );
    } catch (err) {
      console.error('Ошибка при удалении статьи:', err);
    }
  };

  useEffect(() => {
    if (feedType !== 'favourites') {
      fetchArticles();
    }
  }, [feedType, selectedTag, userId, currentPage]);

  if (loading && feedType !== 'favourites')
    return <div>Загрузка статей...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const filteredArticles =
    feedType === 'favourites'
      ? articles.filter((article) => article.favorited)
      : articles;

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <StyledFeedContainer>
      <StyledFeedContent>
        <FeedTogler selectedTag={selectedTag || null} onFeedChange={() => {}} />
        <FeedContentComponent
          articles={currentArticles}
          userId={userId}
          feedType={feedType}
          handleFavorite={handleFavorite}
          handleUnfavorite={handleUnfavorite}
          handleDeleteArticle={handleDeleteArticle}
        />
        <Pagination
          currentPage={currentPage}
          totalArticles={filteredArticles.length}
          articlesPerPage={articlesPerPage}
          onPageChange={paginate}
        />
      </StyledFeedContent>
      <StyledSidebar>
        <FeedSidebar />
      </StyledSidebar>
    </StyledFeedContainer>
  );
};

export default Feed;
