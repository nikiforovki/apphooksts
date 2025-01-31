export interface Article {
  slug?: string;
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
  createdAt?: string;
  updatedAt?: string;
  favorited?: boolean;
  favoritesCount: number;
  id?: string;
}

export interface FavouritesProps {
  articles: Article[];
}
