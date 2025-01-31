import styled from 'styled-components';

export const StyledFeedContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
`;

export const StyledFeedContent = styled.div`
  flex: 3;
`;

export const StyledSidebar = styled.div`
  flex: 1;
`;

export const StyledArticleContainer = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

export const StyledArticleTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const StyledArticleBody = styled.p`
  font-size: 16px;
  color: #333;
`;

export const StyledReadMoreLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledAuthorInfo = styled.div`
  margin-top: 10px;
  color: #666;
`;

export const StyledAuthorName = styled.strong`
  font-weight: bold;
`;

export const StyledArticleDate = styled.span`
  margin-left: 10px;
`;
