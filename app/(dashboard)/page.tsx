'use client';

import { Card, CardContent } from '@/_components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/_components/ui/tabs';
import { useEffect, useState } from 'react';
import { ArticleGrid } from './_components/ArticleGrid';
import DashboardHeader from './_components/DashboardHeader';
import { MissionStatus } from './_components/MissionStatus';
import { MonthlyProgress } from './_components/MonthlyProgress';
import { useArticles } from './_hooks/useArticle';

export default function DashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [month, setMonth] = useState<string>(
    new Date().toLocaleString('ko-KR', { month: 'long', year: 'numeric' })
  );

  const {
    articles,
    myArticles,
    commentedArticles,
    isLoading,
    addComment,
    monthlyProgress,
  } = useArticles(selectedDate);

  useEffect(() => {
    if (selectedDate) {
      setMonth(
        selectedDate.toLocaleString('ko-KR', { month: 'long', year: 'numeric' })
      );
    }
  }, [selectedDate]);

  const handleCommentToggle = async (articleId: string) => {
    try {
      await addComment(articleId);
      console.log({
        title: '댓글 상태가 업데이트되었습니다',
        description: '미션 진행 상황이 갱신되었습니다.',
      });
    } catch {
      console.log({
        title: '오류가 발생했습니다',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <DashboardHeader month={month} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-3">
          <CardContent className="p-6">
            <MonthlyProgress progress={monthlyProgress} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">달력</CardContent>
        </Card>
      </div>

      <MissionStatus
        myArticlesCount={myArticles.length}
        commentedCount={commentedArticles.length}
        totalCount={articles.length}
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">전체 글</TabsTrigger>
          <TabsTrigger value="my">내 글</TabsTrigger>
          <TabsTrigger value="commented">댓글 단 글</TabsTrigger>
          <TabsTrigger value="not-commented">댓글 안 단 글</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ArticleGrid
            articles={articles}
            commentedArticles={commentedArticles}
            onCommentToggle={handleCommentToggle}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="my">
          <ArticleGrid
            articles={myArticles}
            commentedArticles={commentedArticles}
            onCommentToggle={handleCommentToggle}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="commented">
          <ArticleGrid
            articles={articles.filter((article) =>
              commentedArticles.some((a) => a.id === article.id)
            )}
            commentedArticles={commentedArticles}
            onCommentToggle={handleCommentToggle}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="not-commented">
          <ArticleGrid
            articles={articles.filter(
              (article) =>
                !commentedArticles.some((a) => a.id === article.id) &&
                !myArticles.some((a) => a.id === article.id)
            )}
            commentedArticles={commentedArticles}
            onCommentToggle={handleCommentToggle}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
