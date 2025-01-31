import styled from 'styled-components';

export const StyledFavoriteButtonContainer = styled.button<{
  $isFavorited: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid ${({ $isFavorited }) => ($isFavorited ? '#5cb85c' : '#ccc')};
  background-color: ${({ $isFavorited }) =>
    $isFavorited ? '#5cb85c' : '#fff'};
  color: ${({ $isFavorited }) => ($isFavorited ? '#fff' : '#333')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${({ $isFavorited }) =>
      $isFavorited ? '#4cae4c' : '#f5f5f5'};
  }
`;
