import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '../../utils/auth';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.push('/login');
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) return <p>Loading...</p>;

  return children;
}
