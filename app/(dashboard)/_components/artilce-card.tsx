import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { Article } from '@/app/_types/article';

interface ArticleCardProps {
  article: Article;
  hasCommented: boolean;
  onCommentToggle: (articleId: string) => void;
}

export function ArticleCard({
  article,
  hasCommented,
  onCommentToggle,
}: ArticleCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-video overflow-hidden">
        {article.thumbnailUrl ? (
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">이미지 없음</span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{article.authorName}</Badge>
          <span className="text-xs text-gray-500">
            {new Date(article.createdAt).toLocaleDateString('ko-KR')}
          </span>
        </div>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:underline">
            {article.title}
          </h3>
        </a>

        <p className="text-sm text-gray-600 line-clamp-3">
          {article.description}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          읽어보기
        </a>

        <Button
          size="sm"
          variant={hasCommented ? 'default' : 'outline'}
          onClick={() => onCommentToggle(article.id)}
          className={hasCommented ? 'bg-green-600 hover:bg-green-700' : ''}
        >
          {hasCommented ? (
            <>
              <CheckCircle className="mr-1 h-4 w-4" /> 댓글 완료
            </>
          ) : (
            <>
              <MessageCircle className="mr-1 h-4 w-4" /> 댓글 달기
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
