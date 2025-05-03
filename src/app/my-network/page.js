import Filter from "@/components/filter";
import { MyNetWorkUserList } from "@/components/user-list/my-network-user-list";

export default function MyNetworkPage() {
	return (
		<div className="flex flex-col sm:flex-row items-start min-h-screen px-10 py-15 gap-3">
			<div className="flex flex-col items-center mr-8">
				<Filter />
			</div>

			<div className="mx-auto">
				<MyNetWorkUserList />
			</div>
		</div>
	);
}