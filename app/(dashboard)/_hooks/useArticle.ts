// hooks/use-articles.ts
import { Article, MonthlyProgressType } from '@/app/_types/article';
import { useEffect, useState } from 'react';

// 현재 사용자 ID (실제 구현에서는 인증 시스템과 연동)
const CURRENT_USER_ID = 'current-user-id';

// 예시 데이터 (실제로는 Supabase 등에서 데이터를 가져옴)
const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Next.js App Router의 모든 것',
    url: 'https://example.com/next-app-router',
    description:
      'Next.js 14에서 도입된 App Router 구조에 대한 심층 분석과 사용 방법을 알아봅니다.',
    thumbnailUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ35Qqfexsha0k8HoioX5RExmp8nC1gHFjBcw&s',
    authorId: CURRENT_USER_ID,
    authorName: '김개발',
    createdAt: '2025-03-10T09:00:00Z',
  },
  {
    id: '2',
    title: 'Tailwind CSS로 디자인 시스템 구축하기',
    url: 'https://example.com/tailwind-design-system',
    description:
      'Tailwind CSS를 활용해 확장 가능한 디자인 시스템을 구축하는 방법과 best practice를 소개합니다.',
    thumbnailUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ35Qqfexsha0k8HoioX5RExmp8nC1gHFjBcw&s',
    authorId: 'user-2',
    authorName: '이디자인',
    createdAt: '2025-03-12T10:30:00Z',
  },
  {
    id: '3',
    title: 'TypeScript 5.0 새로운 기능 정리',
    url: 'https://example.com/typescript-5',
    description:
      'TypeScript 5.0의 주요 기능과 개선사항을 알아보고, 실무에 적용하는 방법을 소개합니다.',
    thumbnailUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ35Qqfexsha0k8HoioX5RExmp8nC1gHFjBcw&s',
    authorId: 'user-3',
    authorName: '박타입',
    createdAt: '2025-03-15T14:00:00Z',
  },
  {
    id: '4',
    title: 'Zustand로 전역 상태 관리하기',
    url: 'https://example.com/zustand-state',
    description:
      'Redux보다 간단하게 사용할 수 있는 Zustand로 React 애플리케이션의 상태를 관리하는 방법을 알아봅니다.',
    thumbnailUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ35Qqfexsha0k8HoioX5RExmp8nC1gHFjBcw&s',
    authorId: CURRENT_USER_ID,
    authorName: '김개발',
    createdAt: '2025-03-18T11:00:00Z',
  },
  {
    id: '5',
    title: 'ShadCN UI 컴포넌트 커스터마이징 가이드',
    url: 'https://example.com/shadcn-customizing',
    description:
      'ShadCN UI 컴포넌트를 프로젝트에 맞게 커스터마이징하는 방법과 주의사항을 소개합니다.',
    thumbnailUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ35Qqfexsha0k8HoioX5RExmp8nC1gHFjBcw&s',
    authorId: 'user-4',
    authorName: '최프론트',
    createdAt: '2025-03-20T08:45:00Z',
  },
];

// 댓글 데이터 (실제로는 Supabase에서 관리)
let MOCK_COMMENTED_ARTICLE_IDS: string[] = ['2', '3'];

export function useArticles(selectedDate?: Date) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [commentedArticles, setCommentedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 특정 월의 데이터만 필터링하는 함수
  const filterArticlesByMonth = (articles: Article[], date: Date) => {
    return articles.filter((article) => {
      const articleDate = new Date(article.createdAt);
      return (
        articleDate.getMonth() === date.getMonth() &&
        articleDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // 특정 사용자의 글만 필터링하는 함수
  const filterMyArticles = (articles: Article[]) => {
    return articles.filter((article) => article.authorId === CURRENT_USER_ID);
  };

  // 댓글을 단 글만 필터링하는 함수
  const filterCommentedArticles = (articles: Article[]) => {
    return articles.filter((article) =>
      MOCK_COMMENTED_ARTICLE_IDS.includes(article.id)
    );
  };

  // 데이터 로드 (실제로는 Supabase 등에서 비동기로 데이터를 가져옴)
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // API 호출을 시뮬레이션 (실제 구현에서는 supabase 호출)
        await new Promise((resolve) => setTimeout(resolve, 500));

        let filteredArticles = [...MOCK_ARTICLES];

        // 선택된 날짜가 있으면 해당 월의 데이터만 필터링
        if (selectedDate) {
          filteredArticles = filterArticlesByMonth(
            filteredArticles,
            selectedDate
          );
        }

        setArticles(filteredArticles);
        setCommentedArticles(filterCommentedArticles(filteredArticles));
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedDate]);

  // 댓글 토글 기능
  const addComment = async (articleId: string) => {
    try {
      // API 호출을 시뮬레이션 (실제 구현에서는 supabase 호출)
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (MOCK_COMMENTED_ARTICLE_IDS.includes(articleId)) {
        // 댓글이 이미 있으면 제거
        MOCK_COMMENTED_ARTICLE_IDS = MOCK_COMMENTED_ARTICLE_IDS.filter(
          (id) => id !== articleId
        );
      } else {
        // 댓글이 없으면 추가
        MOCK_COMMENTED_ARTICLE_IDS.push(articleId);
      }

      // 상태 업데이트
      setCommentedArticles(filterCommentedArticles(articles));

      return true;
    } catch (error) {
      console.error('Error toggling comment:', error);
      throw error;
    }
  };

  // 월간 진행률 계산
  const calculateMonthlyProgress = (): MonthlyProgressType => {
    const myArticles = filterMyArticles(articles);

    // 목표: 2개의 글 작성, 모든 스터디원 글에 댓글 달기
    const articleTarget = 2;
    const commentTarget = articles.length - myArticles.length; // 내 글이 아닌 모든 글

    return {
      articleProgress: Math.min(myArticles.length, articleTarget),
      commentProgress: commentedArticles.length,
      articleTarget,
      commentTarget,
    };
  };

  return {
    articles,
    myArticles: filterMyArticles(articles),
    commentedArticles,
    isLoading,
    addComment,
    monthlyProgress: calculateMonthlyProgress(),
  };
}
