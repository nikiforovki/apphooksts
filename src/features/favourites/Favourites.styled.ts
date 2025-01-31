import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledFavouritesContainer = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

export const StyledFavouritesTitle = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`;

export const StyledArticlePreview = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px #000000;
`;

export const StyledArticleMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const StyledAuthorImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledAuthorName = styled(Link)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledDate = styled.span`
  font-size: 14px;
  color: #666;
`;

export const StyledPreviewLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const StyledArticleTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
`;

export const StyledArticleDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 12px;
`;

export const StyledTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StyledTag = styled.span`
  font-size: 14px;
  color: #555;
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
`;
