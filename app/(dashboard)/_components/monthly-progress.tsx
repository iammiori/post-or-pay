// components/dashboard/monthly-progress.tsx
import { MonthlyProgressType } from '@/app/_types/article';
import { Progress } from '@/components/ui/progress';

interface MonthlyProgressProps {
  progress: MonthlyProgressType;
}

export function MonthlyProgress({ progress }: MonthlyProgressProps) {
  const { articleProgress, commentProgress, articleTarget, commentTarget } =
    progress;

  // 목표 대비 달성률 계산
  const articlePercentage = Math.min(
    Math.round((articleProgress / articleTarget) * 100),
    100
  );
  const commentPercentage = Math.min(
    Math.round((commentProgress / commentTarget) * 100),
    100
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">글 작성 진행률</h3>
          <span className="text-sm font-medium">
            {articleProgress}/{articleTarget} 작성 ({articlePercentage}%)
          </span>
        </div>
        <Progress value={articlePercentage} className="h-2" />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">댓글 작성 진행률</h3>
          <span className="text-sm font-medium">
            {commentProgress}/{commentTarget} 작성 ({commentPercentage}%)
          </span>
        </div>
        <Progress value={commentPercentage} className="h-2" />
      </div>
    </div>
  );
}
