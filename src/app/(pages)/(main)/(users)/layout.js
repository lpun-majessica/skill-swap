import { ConnectionProvider } from "@/contexts/connection-context";
import { UserProvider } from "@/contexts/users-context";

export default function UsersLayout({ children }) {
  return <DataProvider>{children}</DataProvider>;
}

function DataProvider({ children }) {
  return (
    <ConnectionProvider>
      <UserProvider>
        <div className="mt-5 mb-8 flex flex-col justify-center gap-10 lg:mt-12 lg:flex-row">
          {children}
        </div>
      </UserProvider>
    </ConnectionProvider>
  );
}
