export interface ArticleFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }) => void;
}
