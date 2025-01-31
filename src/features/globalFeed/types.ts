export interface Article {
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
  };
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
}
