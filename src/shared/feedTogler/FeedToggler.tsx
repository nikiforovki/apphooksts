import React from 'react';
import { StyledNavLink } from './FeedTogler.styled';
import { FeedToglerProps } from './type';

const FeedTogler: React.FC<FeedToglerProps> = ({
  selectedTag,
  onFeedChange,
}) => {
  return (
    <div>
      <StyledNavLink to="/" end onClick={() => onFeedChange('global')}>
        Global
      </StyledNavLink>
      <StyledNavLink to="/feed" onClick={() => onFeedChange('my-feed')}>
        My Feed
      </StyledNavLink>
      {selectedTag && (
        <StyledNavLink
          to={`/tags/${selectedTag}`}
          onClick={() => onFeedChange('tag', selectedTag)}
        >
          #{selectedTag}
        </StyledNavLink>
      )}
    </div>
  );
};

export default FeedTogler;
