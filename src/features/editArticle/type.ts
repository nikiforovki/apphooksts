export interface Article {
  id: string;
  title: string;
  description: string;
  body: string;
  slug: string;
  tagList?: string[];
  uid?: string;
}

export interface FormData {
  title: string;
  description: string;
  body: string;
  tagList: string;
}
