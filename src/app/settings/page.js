'use client';

import { useEffect, useState } from 'react';
import UserDetails from '@/components/profile/UserDetails';
import SkillSection from '@/components/profile/SkillSection';
import users from '@/lib/data/users.json';

export default function SettingsPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //id = 1
    setUser(users[0]);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex justify-center mt-28 mb-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <UserDetails user={user} isEditable={true}/>
        <div className="flex flex-col gap-6 ">
          {user && (
            <>
              <SkillSection title="Teach" skillKey="teach" userSkills={user.teach} />
              <SkillSection title="Learn" skillKey="learn" userSkills={user.learn} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
