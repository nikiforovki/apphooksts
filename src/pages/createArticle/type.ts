export interface ArticleData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface Author {
  username: string;
  uid: string;
  bio?: string;
  image?: string;
  following: boolean;
}

export interface ApiResponse {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentUserContextType {
  currentUser: {
    uid: string;
    name: string;
    bio?: string;
    image?: string;
  } | null;
}
