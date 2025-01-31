export interface Article {
  slug?: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  authorId?: string;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
    id?: string;
    uid?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  favorited?: boolean;
  favoritesCount: number;
  id?: string;
  tags?: string[];
}

export interface FeedProps {
  feedType: 'global' | 'my-feed' | 'favourites' | 'tag';
  selectedTag?: string;
  userId?: string;
}
