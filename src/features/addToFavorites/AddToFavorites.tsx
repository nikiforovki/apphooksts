import React, { useState } from 'react';
import styled from 'styled-components';
import { AddToFavoritesProps } from './type';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const FavoriteButton = styled.button<{ favorited: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: ${({ favorited }) => (favorited ? 'red' : 'gray')};
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ favorited }) => (favorited ? 'darkred' : 'black')};
  }
`;

const AddToFavorites: React.FC<AddToFavoritesProps> = ({
  isFavorited,
  favoritesCount,
  articleSlug,
}) => {
  const [favorited, setFavorited] = useState(isFavorited);
  const [count, setCount] = useState(favoritesCount);

  const handleFavorite = async () => {
    try {
      const method = favorited ? 'DELETE' : 'POST';
      const url = `${API_BASE_URL}/articles/${articleSlug}/favorite`;
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Server response:', text);
        throw new Error('Ошибка при обработке лайка');
      }
      const data = await response.json();
      setFavorited(data.favorited);
      setCount(data.favoritesCount);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <FavoriteButton onClick={handleFavorite} favorited={favorited}>
      {favorited ? '❤️' : '🤍'} {count}
    </FavoriteButton>
  );
};

export default AddToFavorites;
