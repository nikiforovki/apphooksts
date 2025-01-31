import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledFeedContainer = styled.div`
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const StyledFeedContent = styled.div`
  flex: 3;
`;

export const StyledSidebar = styled.div`
  flex: 1;
`;

export const StyledArticlePreview = styled.div`
  position: relative;
  border-bottom: 1px solid #e5e5e5;
`;

export const StyledArticleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  position: relative;
`;

export const StyledAuthorImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

export const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledAuthorName = styled(Link)`
  font-weight: 500;
  color: #5cb85c;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledDate = styled.span`
  color: #bbb;
  font-size: 0.8rem;
`;

export const StyledPreviewLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledArticleTitle = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 3px;
`;

export const StyledArticleDescription = styled.p`
  font-weight: 300;
  color: #999;
  margin-bottom: 15px;
  font-size: 1rem;
  line-height: 1.3rem;
`;

export const StyledTagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;

export const StyledTag = styled.li`
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 10rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  color: #aaa;
`;

export const StyledLikeButton = styled.button<{ $favorited?: boolean }>`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  background-color: ${({ $favorited }) => ($favorited ? '#5cb85c' : '#f0f0f0')};
  color: ${({ $favorited }) => ($favorited ? '#fff' : '#000')};
  width: 40px;
  height: 40px;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background-color: ${({ $favorited }) =>
      $favorited ? '#4cae4c' : '#e0e0e0'};
  }
`;

export const StyledEditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #45a049;
  }
`;

export const StyledDeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #e53935;
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1rem;
`;
