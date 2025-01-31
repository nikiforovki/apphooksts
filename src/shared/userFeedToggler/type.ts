export interface UserFeedToglerProps {
  selectedTag: string | null;
  onFeedChange: (feedType: string, tag?: string) => void;
}
