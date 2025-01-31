import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  StyledForm,
  StyledFormGroup,
  StyledLabel,
  StyledInput,
  StyledTextarea,
  StyledError,
  StyledSubmitButton,
} from './ArticleForm.styled';
import { ArticleFormProps } from './type';

const ArticleForm: React.FC<ArticleFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    title: string;
    description: string;
    body: string;
    tags: string;
  }>();

  const handleFormSubmit = (data: {
    title: string;
    description: string;
    body: string;
    tags: string;
  }) => {
    const tagList = data.tags.split(',').map((tag) => tag.trim());
    onSubmit({
      title: data.title,
      description: data.description,
      body: data.body,
      tagList,
    });
  };

  navigate('/feed');

  return (
    <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
      <StyledFormGroup>
        <StyledLabel htmlFor="title">Заголовок</StyledLabel>
        <StyledInput
          id="title"
          {...register('title', { required: 'Это поле обязательно' })}
        />
        {errors.title && <StyledError>{errors.title.message}</StyledError>}
      </StyledFormGroup>

      <StyledFormGroup>
        <StyledLabel htmlFor="description">Описание</StyledLabel>
        <StyledInput
          id="description"
          {...register('description', { required: 'Это поле обязательно' })}
        />
        {errors.description && (
          <StyledError>{errors.description.message}</StyledError>
        )}
      </StyledFormGroup>

      <StyledFormGroup>
        <StyledLabel htmlFor="body">Содержание</StyledLabel>
        <StyledTextarea
          id="body"
          {...register('body', { required: 'Это поле обязательно' })}
        />
        {errors.body && <StyledError>{errors.body.message}</StyledError>}
      </StyledFormGroup>

      <StyledFormGroup>
        <StyledLabel htmlFor="tags">Теги (через запятую)</StyledLabel>
        <StyledInput
          id="tags"
          {...register('tags', { required: 'Это поле обязательно' })}
        />
        {errors.tags && <StyledError>{errors.tags.message}</StyledError>}
      </StyledFormGroup>

      <StyledSubmitButton type="submit">Publish Article</StyledSubmitButton>
    </StyledForm>
  );
};

export default ArticleForm;
