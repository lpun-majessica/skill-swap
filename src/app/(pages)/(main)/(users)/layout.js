import { UserProvider } from "@/contexts/users-context";

export default function UsersLayout({ children }) {
  return <DataProvider>{children}</DataProvider>;
}

function DataProvider({ children }) {
  return <UserProvider>{children}</UserProvider>;
}
