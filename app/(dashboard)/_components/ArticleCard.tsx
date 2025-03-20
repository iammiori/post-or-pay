import { Article } from '@/app/_types/article';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle, ImageOff, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

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
          <Image
            loader={imageLoader}
            src={article.thumbnailUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <ImageOff className="h-10 w-10 text-gray-400" />
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
          className="block">
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
          className="text-sm text-blue-600 hover:underline">
          읽어보기
        </a>

        <Button
          size="sm"
          variant={hasCommented ? 'default' : 'outline'}
          onClick={() => onCommentToggle(article.id)}
          className={hasCommented ? 'bg-green-600 hover:bg-green-700' : ''}>
          {hasCommented ? (
            <>
              <CheckCircle className="mr-1 h-4 w-4" /> 댓글 작성 완료
            </>
          ) : (
            <>
              <MessageCircle className="mr-1 h-4 w-4" /> 댓글 달았나요?
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
