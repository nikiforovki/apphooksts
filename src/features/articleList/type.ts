export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
    uid?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ArticleListProps {
  articles: Article[];
}
