// components/dashboard/mission-status.tsx
import { Card, CardContent } from '@/components/ui/card';
import { FileText, MessageSquare, Users } from 'lucide-react';

interface MissionStatusProps {
  myArticlesCount: number;
  commentedCount: number;
  totalCount: number;
}

export function MissionStatus({
  myArticlesCount,
  commentedCount,
  totalCount,
}: MissionStatusProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                내가 작성한 글
              </p>
              <h3 className="text-2xl font-bold">{myArticlesCount}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            목표: 월 2개 (남은 글: {Math.max(0, 2 - myArticlesCount)}개)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">댓글 단 글</p>
              <h3 className="text-2xl font-bold">{commentedCount}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            목표: 전체 글 댓글 (남은 글:{' '}
            {Math.max(0, totalCount - myArticlesCount - commentedCount)}개)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                전체 스터디원 글
              </p>
              <h3 className="text-2xl font-bold">{totalCount}</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            모든 스터디원의 글에 댓글을 달아주세요
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
