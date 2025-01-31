import React, { useContext } from 'react';
import UserFeedToggler from '@shared/UserFeedToggler'; // Исправлено название
import { StyledContainer, StyledUserContainer } from './UserProfiles.styled';
import { UserProfilesProps } from './type';
import { CurrentUserContext } from '@shared/context/curentUser';

const UserProfiles: React.FC<UserProfilesProps> = ({
  selectedTag,
  onFeedChange,
}) => {
  const currentUserContext = useContext(CurrentUserContext);
  const currentUser = currentUserContext?.currentUser;

  return (
    <StyledContainer>
      <UserFeedToggler
        selectedTag={selectedTag || null}
        onFeedChange={onFeedChange || (() => {})}
      />
      <StyledUserContainer>
        {currentUser ? (
          <div>
            <h2>Профиль пользователя</h2>
            <p>Имя: {currentUser.name}</p>
            <p>Email: {currentUser.email}</p>
          </div>
        ) : (
          <p>Пользователь не авторизован</p>
        )}
      </StyledUserContainer>
    </StyledContainer>
  );
};

export default UserProfiles;
