export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
    uid?: string;
  };
  createdAt: string;
  updatedAt: string;
  favoritesCount: number;
  favorited: boolean;
}

export interface ArticleData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
  favoritesCount?: number;
  favorited?: boolean;
}
