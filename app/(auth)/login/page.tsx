import { Metadata } from 'next';
import { LoginForm } from './_components/LoginForm';

export const metadata: Metadata = {
  title: '로그인 | 기술블로그 미션 관리',
  description: '기술블로그 미션 관리 시스템에 로그인하세요',
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-4">
        <LoginForm />
      </div>
    </div>
  );
}
