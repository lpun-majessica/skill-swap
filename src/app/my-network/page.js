import Filter from "@/components/filter";
import { MyNetWorkUserList } from "@/components/user-list/my-network-user-list";

export default function MyNetworkPage() {
	return (
		<div className="flex flex-row items-start min-h-screen px-20 py-10">
			<div className="flex flex-col items-center mr-8">
				<Filter />
			</div>

			<div>
				<MyNetWorkUserList />
			</div>
		</div>
	);
}
