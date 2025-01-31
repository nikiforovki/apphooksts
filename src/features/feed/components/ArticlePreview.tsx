import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  StyledArticleMeta,
  StyledAuthorImage,
  StyledInfo,
  StyledAuthorName,
  StyledDate,
  StyledPreviewLink,
  StyledArticleTitle,
  StyledArticleDescription,
  StyledTagList,
  StyledTag,
  StyledLikeButton,
  StyledEditButton,
  StyledDeleteButton,
  StyledButtonContainer,
} from '../Feed.styled';
import { Article } from '../type';

interface ArticlePreviewProps {
  article: Article;
  userId?: string;
  feedType: string;
  handleFavorite: (slug: string) => void;
  handleUnfavorite: (slug: string) => void;
  handleDeleteArticle: (slug: string) => void;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  article,
  userId,
  feedType,
  handleFavorite,
  handleUnfavorite,
  handleDeleteArticle,
}) => {
  return (
    <div>
      <StyledArticleMeta>
        <Link to={`/profiles/${article.author.username}`}>
          <StyledAuthorImage
            src={article.author.image}
            alt={article.author.username}
          />
        </Link>
        <StyledInfo>
          <StyledAuthorName to={`/profiles/${article.author.username}`}>
            {article.author.username}
          </StyledAuthorName>
          <StyledDate>
            {new Date(article.createdAt || '').toDateString()}
          </StyledDate>
        </StyledInfo>
        <StyledLikeButton
          $favorited={article.favorited}
          onClick={() => {
            if (article.favorited) {
              handleUnfavorite(article.slug || '');
            } else {
              handleFavorite(article.slug || '');
            }
          }}
        >
          {article.favoritesCount}
        </StyledLikeButton>
      </StyledArticleMeta>
      <StyledPreviewLink to={`/articles/${article.slug}`}>
        <StyledArticleTitle>{article.title}</StyledArticleTitle>
        <StyledArticleDescription>
          {article.description}
        </StyledArticleDescription>
        <span>Читать далее...</span>
        <StyledTagList>
          {article.tagList?.map((tag) => (
            <StyledTag key={tag}>{tag}</StyledTag>
          ))}
        </StyledTagList>
      </StyledPreviewLink>
      {userId === article.author.uid && feedType !== 'global' && (
        <StyledButtonContainer>
          <StyledEditButton
            onClick={() => {
              window.location.href = `/articles/${article.slug}/edit`;
            }}
          >
            <FaEdit /> Редактировать
          </StyledEditButton>
          <StyledDeleteButton
            onClick={() => handleDeleteArticle(article.slug || '')}
          >
            <FaTrash /> Удалить
          </StyledDeleteButton>
        </StyledButtonContainer>
      )}
    </div>
  );
};

export default ArticlePreview;
