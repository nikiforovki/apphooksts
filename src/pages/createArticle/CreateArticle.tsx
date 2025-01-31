import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '@shared/ArticleForm';
import { CurrentUserContext } from '@shared/CurentUser';
import { ArticleData, CurrentUserContextType } from './type';

const CreateArticle = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const context = useContext(CurrentUserContext) as CurrentUserContextType;

  if (!context) {
    console.error('Контекст не найден');
    return null;
  }

  const { currentUser } = context;
  const navigate = useNavigate();

  const handleSubmit = async (data: ArticleData) => {
    if (!API_BASE_URL) {
      console.error('API base URL не задан');
      return;
    }

    if (!currentUser) {
      console.error('Пользователь не авторизован');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: data.title.toLowerCase().replace(/\s+/g, '-'),
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tagList,
          favorited: false,
          favoritesCount: 0,
          author: {
            username: currentUser.name,
            uid: currentUser.uid,
            bio: currentUser.bio || 'A passionate writer.',
            image: currentUser.image || 'https://i.pravatar.cc/150?img=1',
            following: false,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании статьи');
      }

      navigate('/feed');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div>
      <ArticleForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateArticle;
