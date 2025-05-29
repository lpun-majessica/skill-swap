import Filter from "@/components/filter";
import { MyNetWorkUserList } from "@/components/user-list/my-network-user-list";
import AuthGuard from "@/components/auth/AuthGuard";

export default function MyNetworkPage() {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col items-start gap-2 px-4 py-3 sm:flex-row lg:gap-3 lg:px-10 lg:py-6 2xl:px-12">
        <div className="mr-4 flex flex-col items-center sm:mt-10 sm:mr-6 lg:mr-8">
          <Filter />
        </div>

        <div className="mx-auto w-full max-w-screen-2xl">
          <MyNetWorkUserList />
        </div>
      </div>
    </AuthGuard>
  );
}
