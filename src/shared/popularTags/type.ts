export interface PopularTagsProps {
  tags: string[];
  selectedTag: string | null;
  onTagClick: (tag: string | null) => void;
}
