import styled from 'styled-components';

export const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 30px 0;
  padding: 15px 0;
  border-top: 1px solid #e5e5e5;
`;

export const StyledPageButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${({ disabled }) => (disabled ? '#f5f5f5' : 'white')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#999' : '#333')};

  &:hover:not(:disabled) {
    background-color: #e9e9e9;
  }
`;
