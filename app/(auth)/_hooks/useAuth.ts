'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../_stores/useAuthStore';
import { supabase } from '@/_lib/supabase';

export const useAuth = () => {
  const router = useRouter();
  const { setUser, logout: storeLogout } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // GitHub 소셜 로그인
  const loginWithGitHub = async () => {
    const redirectUrl = `${window.location.origin}/callback`;
    console.log('리다이렉트 URL:', redirectUrl);
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/`, // 명시적으로 홈 페이지로 리다이렉트
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃
  const logout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      storeLogout();
      router.push('/login');
    } catch (err) {
      setError('로그아웃 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 현재 세션 확인
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('세션 확인 오류:', error);
        return;
      }

      if (data.session) {
        setUser(data.session.user);
      }
    };

    checkSession();
  }, [setUser]);

  return {
    loginWithGitHub,
    logout,
    isLoading,
    error,
  };
};
