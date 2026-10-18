'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AboutHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#products') {
      router.replace('/products');
    }
  }, [router]);

  return null;
}
