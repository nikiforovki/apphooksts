import { Article, ArticleData } from './type';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch articles');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

export const createArticle = async (
  articleData: ArticleData,
): Promise<Article> => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create article');
    }
    const data = await response.json();
    return data.article;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

export const checkArticleExists = async (id: string) => {
  try {
    console.log(`Проверка статьи с id: ${id}`);
    const response = await fetch(
      `${API_BASE_URL}/articles/${encodeURIComponent(id)}`,
    );
    console.log('Статус ответа:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Текст ошибки:', errorText);
      throw new Error(`Ошибка при проверке статии: ${errorText}`);
    }

    return true;
  } catch (error) {
    console.error('Ошибка при проверке статии:', error);
    return false;
  }
};

export const updateArticle = async (
  url: string,
  articleData: Partial<ArticleData>,
): Promise<Article | null> => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ article: articleData }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Текст ошибки:', errorText);
      throw new Error(errorText || 'Не удалось обновить статью');
    }

    const data = await response.json();

    return data.article;
  } catch (err) {
    console.error('Ошибка при обновлении статьи:', err);
    throw err;
  }
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles?slug=${slug}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch article');
    }
    const data = await response.json();
    if (data.length === 0) {
      throw new Error('Article not found');
    }
    return data[0];
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

export const deleteArticle = async (slug: string): Promise<Article> => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${slug}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete article');
    }
    const data = await response.json();
    return data.article;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

export const favoriteArticle = async (slug: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles?slug=${slug}`);
    const data = await response.json();

    if (data.length === 0) {
      throw new Error('Article not found');
    }

    const article = data[0];

    const updateResponse = await fetch(
      `${API_BASE_URL}/articles/${article.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favoritesCount: article.favoritesCount + 1,
          favorited: true,
        }),
      },
    );

    if (!updateResponse.ok) {
      throw new Error('Failed to favorite article');
    }

    const updatedArticle = await updateResponse.json();
    return updatedArticle;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

export const unfavoriteArticle = async (slug: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles?slug=${slug}`);
    const data = await response.json();

    if (data.length === 0) {
      throw new Error('Article not found');
    }

    const article = data[0];

    const updateResponse = await fetch(
      `${API_BASE_URL}/articles/${article.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favoritesCount: article.favoritesCount - 1,
          favorited: false,
        }),
      },
    );

    if (!updateResponse.ok) {
      throw new Error('Failed to unfavorite article');
    }

    const updatedArticle = await updateResponse.json();
    return updatedArticle;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};
