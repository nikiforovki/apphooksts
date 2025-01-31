import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const StyledArticleContainer = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
`;

export const StyledAuthorImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

export const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
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

export const StyledArticleTitle = styled.h2`
  margin: 0;
`;

export const StyledArticleDescription = styled.p`
  margin: 10px 0;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const StyledActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f0f0f0;
  &:hover {
    background-color: #ddd;
  }
`;
