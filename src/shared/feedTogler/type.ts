export interface FeedToglerProps {
  selectedTag: string | null;
  onFeedChange: (feedType: string, tag?: string) => void;
}
