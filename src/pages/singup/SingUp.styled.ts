import styled from 'styled-components';

export const StyledForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const StyledTitleForm = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;

export const StyledText = styled.div`
  text-align: center;
  font-size: 20px;
  color: #008000;
  padding: 10px 0;
  cursor: pointer;
`;

export const StyledInputField = styled.input`
  width: 90%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const StyledSubmitButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledError = styled.span`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const StyledLoading = styled.span`
  color: #007bff;
  font-size: 14px;
`;
