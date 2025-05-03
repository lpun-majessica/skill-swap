import Filter from "@/components/filter";
import { MyNetWorkUserList } from "@/components/user-list/my-network-user-list";

export default function MyNetworkPage() {
	return (
		<div className="flex flex-col sm:flex-row items-start min-h-screen px-4 sm:px-6 lg:px-8 py-3 lg:py-6 gap-2 lg:gap-3">
			<div className="flex flex-col items-center sm:mt-10 mr-4 sm:mr-6 lg:mr-8">
				<Filter />
			</div>

			<div className="w-full max-w-screen-2xl mx-auto">
				<MyNetWorkUserList />
			</div>
		</div>
	);
}
