export interface UserProfilesProps {
  selectedTag?: string | null;
  onFeedChange?: (feedType: string, tag?: string) => void;
  userId?: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  author: {
    uid: string;
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface LocalStorageObject {
  [key: string]: string;
}
