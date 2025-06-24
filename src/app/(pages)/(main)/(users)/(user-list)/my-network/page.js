import { MyNetWorkUserList } from "@/components/user-list/my-network-user-list";
import AuthGuard from "@/components/auth/auth-guard";

export default function MyNetworkPage() {
  return (
    <AuthGuard>
      <MyNetWorkUserList />
    </AuthGuard>
  );
}
