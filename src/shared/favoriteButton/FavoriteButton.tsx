import React, { useEffect, useState } from 'react';
import { StyledFavoriteButtonContainer } from './FavoriteButton.styled';
import { FavoriteButtonProps } from './type';

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  articleId,
  isFavorited,
  onClick,
}) => {
  const [favorited, setFavorited] = useState(isFavorited);

  useEffect(() => {
    const favoritedArticles = JSON.parse(
      localStorage.getItem('favoritedArticles') || '{}',
    );
    setFavorited(favoritedArticles[articleId] || false);
  }, [articleId]);

  const handleClick = () => {
    const newFavoritedState = !favorited;
    setFavorited(newFavoritedState);

    const favoritedArticles = JSON.parse(
      localStorage.getItem('favoritedArticles') || '{}',
    );
    favoritedArticles[articleId] = newFavoritedState;
    localStorage.setItem(
      'favoritedArticles',
      JSON.stringify(favoritedArticles),
    );

    onClick();
  };

  return (
    <StyledFavoriteButtonContainer
      $isFavorited={favorited}
      onClick={handleClick}
    >
      <span>{favorited ? 'Убрать из избранного' : 'Добавить в избранное'}</span>
    </StyledFavoriteButtonContainer>
  );
};

export default FavoriteButton;
