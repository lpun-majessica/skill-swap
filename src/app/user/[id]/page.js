import userData from '@/lib/data/users.json';
import SkillDisplay from '@/components/profile/SkillDisplay';
import UserDetails from '@/components/profile/UserDetails';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB');
}

export default async function UserProfile(props) { //Nextjs 15 yêu cầu
  const params = await props.params;
  const userId = parseInt(params.id);
  const user = userData.find((u) => u.id === userId);

  if (!user) {
    return <div className="text-center mt-10 text-red-600">User not found</div>;
  }

  return (
    <div className="flex justify-center gap-10 mt-25 mx-10 flex-wrap bg-ss-light-FFF dark:bg-ss-black-121 mb-10">
      {/* Left: user details */}
      <UserDetails user={user} isEditable={false} />

      {/* Right: skills */}
      <div className="flex flex-col gap-6 items-center">
        <SkillDisplay title="Skills to Teach" skills={user.teach} />
        <SkillDisplay title="Skills to Learn" skills={user.learn} />
      </div>
    </div>
  );
}
