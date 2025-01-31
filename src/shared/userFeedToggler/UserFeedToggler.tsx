import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { UserFeedToglerProps } from './type';

const StyledNavLink = styled(NavLink)`
  font-size: 24px;
  font-weight: bold;
  color: #95979a;
  text-decoration: none;
  margin-right: 20px;
  cursor: pointer;

  &.active {
    color: #36c009;
    text-decoration: underline;
    text-underline-offset: 10px;
    text-decoration-thickness: 4px;
  }
`;

const UserFeedToggler: React.FC<UserFeedToglerProps> = ({
  selectedTag,
  onFeedChange,
}) => {
  return (
    <div>
      <StyledNavLink
        to="/favouritespage"
        end
        onClick={() => onFeedChange && onFeedChange('favourites')}
      >
        Favourites
      </StyledNavLink>
      <StyledNavLink
        to="/feed"
        onClick={() => onFeedChange && onFeedChange('my-feed')}
      >
        My Feed
      </StyledNavLink>
      {selectedTag && (
        <StyledNavLink
          to={`/tags/${selectedTag}`}
          onClick={() => onFeedChange && onFeedChange('tag', selectedTag)}
        >
          #{selectedTag}
        </StyledNavLink>
      )}
    </div>
  );
};

export default UserFeedToggler;
