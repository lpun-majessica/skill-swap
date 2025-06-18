import { ConnectionProvider } from "@/contexts/connection-context";
import { UserProvider } from "@/contexts/users-context";
import { SkillProvider } from "@/contexts/skill-context";

export default function UserPageLayout({ children }) {
  return <DataProvider>{children}</DataProvider>;
}

function DataProvider({ children }) {
  return (
    <SkillProvider>
      <ConnectionProvider>
        <UserProvider>{children}</UserProvider>
      </ConnectionProvider>
    </SkillProvider>
  );
}
