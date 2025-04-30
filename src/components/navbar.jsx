'use client';

import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/common/mode-toggle';

export default function Navbar() {
  const pathname = usePathname();

  // Hide Navbar if path is /login
  if (pathname === '/login') return null;

  return (
    <nav>
      <div className="flex items-center justify-between shadow-2xl shadow-accent p-4 ">
        <div className="text-lg font-bold">SkillSwap</div>
        <div className="flex space-x-4">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}