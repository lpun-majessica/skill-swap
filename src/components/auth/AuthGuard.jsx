'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/auth-context';

export default function AuthGuard({ children }) {
  const { currentUser, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.replace('/login');
    }
  }, [isLoading, currentUser, router]);

  if (isLoading || !currentUser) {
    return null;
  }

  return children;
}
