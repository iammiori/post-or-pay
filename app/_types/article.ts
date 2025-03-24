export type Article = {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnailUrl: string;
  authorId: string;
  authorName: string;
  createdAt: string;
};

export type MonthlyProgressType = {
  articleProgress: number;
  commentProgress: number;
  articleTarget: number;
  commentTarget: number;
};
