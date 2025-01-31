export interface Article {
  slug: string;
  favorited: boolean;
  author: {
    username: string;
    image: string;
  };
  title: string;
  description: string;
  createdAt?: string;
}
