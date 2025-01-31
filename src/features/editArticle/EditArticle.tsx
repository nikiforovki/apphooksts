import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormData } from './type';
import { getArticleBySlug } from '@shared/api';
import {
  StyledContainer,
  StyledTitle,
  StyledForm,
  StyledFormGroup,
  StyledLabel,
  StyledInput,
  StyledTextArea,
  StyledButton,
  StyledErrorMessage,
  StyledLoadingMessage,
} from './EditArticle.styled';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const EditArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [articleId, setArticleId] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (!slug) {
      setError('Slug статьи не указан');
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const article = await getArticleBySlug(slug);
        if (!article) {
          throw new Error('Статья не найдена');
        }

        setValue('title', article.title);
        setValue('description', article.description);
        setValue('body', article.body);
        setValue('tagList', article.tagList?.join(',') || '');
        setArticleId(article.id);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Произошла ошибка при загрузке статьи',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSubmitting(true);
    try {
      if (!articleId) {
        throw new Error('ID статьи не указано');
      }

      const updatedData = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.split(',').map((tag) => tag.trim()),
      };

      const url = `${API_BASE_URL}/articles/${articleId}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении статьи');
      }

      const updatedArticle = await response.json();

      navigate(`/articles/${updatedArticle.slug}`);
    } catch (err) {
      console.error('Ошибка при обновлении статьи:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Произошла ошибка при обновлении статьи',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <StyledLoadingMessage>Загрузка...</StyledLoadingMessage>;
  if (error) return <StyledErrorMessage>Ошибка: {error}</StyledErrorMessage>;

  return (
    <StyledContainer>
      <StyledTitle>Редактирование статьи</StyledTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormGroup>
          <StyledLabel>Заголовок:</StyledLabel>
          <StyledInput
            type="text"
            {...register('title', { required: 'Заголовок обязателен' })}
          />
          {errors.title && (
            <StyledErrorMessage>{errors.title.message}</StyledErrorMessage>
          )}
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel>Описание:</StyledLabel>
          <StyledInput
            type="text"
            {...register('description', {
              required: 'Описание обязательно',
            })}
          />
          {errors.description && (
            <StyledErrorMessage>
              {errors.description.message}
            </StyledErrorMessage>
          )}
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel>Текст статьи:</StyledLabel>
          <StyledTextArea
            {...register('body', { required: 'Текст статьи обязателен' })}
          />
          {errors.body && (
            <StyledErrorMessage>{errors.body.message}</StyledErrorMessage>
          )}
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel>Теги (через запятую):</StyledLabel>
          <StyledInput type="text" {...register('tagList')} />
        </StyledFormGroup>
        <StyledButton type="submit" disabled={submitting}>
          {submitting ? 'Сохранение...' : 'Сохранить изменения'}
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default EditArticle;
