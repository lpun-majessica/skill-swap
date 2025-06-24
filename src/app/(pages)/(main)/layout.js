import { SkillProvider } from "@/contexts/skill-context";

export default function MainPagesLayout({ children }) {
  return <DataProvider>{children}</DataProvider>;
}

function DataProvider({ children }) {
  return <SkillProvider>{children}</SkillProvider>;
}
