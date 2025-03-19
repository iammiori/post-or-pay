import { Article } from '@/app/_types/article';
import { Skeleton } from '@/components/ui/skeleton';
import { ArticleCard } from './artilce-card';

interface ArticleGridProps {
  articles: Article[];
  commentedArticles: Article[];
  onCommentToggle: (articleId: string) => void;
  isLoading: boolean;
}

export function ArticleGrid({
  articles,
  commentedArticles,
  onCommentToggle,
  isLoading,
}: ArticleGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-gray-500">등록된 글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => {
        const hasCommented = commentedArticles.some(
          (commented) => commented.id === article.id
        );

        return (
          <ArticleCard
            key={article.id}
            article={article}
            hasCommented={hasCommented}
            onCommentToggle={onCommentToggle}
          />
        );
      })}
    </div>
  );
}
