import React from 'react';
import { StyledTagsContainer, StyledTag } from './PopularTags.styled';
import { PopularTagsProps } from './type';

const PopularTags: React.FC<PopularTagsProps> = ({ onTagClick }) => {
  const tags = ['react', 'javascript', 'typescript', 'webdev', 'frontend'];

  return (
    <StyledTagsContainer>
      <h3>Popular Tags</h3>
      {tags.map((tag) => (
        <StyledTag key={tag} onClick={() => onTagClick(tag)}>
          {tag}
        </StyledTag>
      ))}
    </StyledTagsContainer>
  );
};

export default PopularTags;
