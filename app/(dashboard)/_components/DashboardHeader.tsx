// components/dashboard/dashboard-header.tsx
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface DashboardHeaderProps {
  month: string;
}

export default function DashboardHeader({ month }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">📝 Post or Pay 💸</h1>
        <p className="text-muted-foreground">
          {month} 기술블로그 미션 현황입니다
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/my-articles">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />내 글 관리하기
          </Button>
        </Link>
      </div>
    </header>
  );
}
