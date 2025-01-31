import { useState, useEffect, useContext } from 'react';
import { getArticles } from '@shared/api';
import { CurrentUserContext } from '@shared/CurentUser';
import { Article } from './type';

const useFilteredArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useContext(CurrentUserContext) || {};
  const userId = currentUser?.name;

  const fetchData = async (): Promise<void> => {
    try {
      const data = await getArticles();
      const filteredArticles = userId
        ? data.filter((article) => article.author.username === userId)
        : data;
      setArticles(filteredArticles);
    } catch (err) {
      console.error('Ошибка при загрузке статей:', err);
      setError('Ошибка при загрузке статей');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return { articles, loading, error };
};

export default useFilteredArticles;
