export interface Article {
  slug: string;
  author: {
    username: string;
    uid?: string | undefined;
  };
  favorited: boolean;
  title: string;
  description: string;
  createdAt?: string;
}
