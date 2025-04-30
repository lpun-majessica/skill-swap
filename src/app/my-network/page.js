import { MyNetWorkUserList } from "@/components/user-list/my-network-user-list";

export default function MyNetworkPage() {
	return (
		<div className="flex flex-row items-start min-h-screen px-20 py-10">
			<div className="flex flex-col items-center mr-8">
				<h1 className="text-4xl font-bold mb-4">Filter</h1>
				<p className="mb-8">Select your preferences.</p>
				<div className="bg-white shadow-md rounded-lg p-4">
					<h2 className="text-xl font-bold">Filter Options</h2>
				</div>
			</div>
			<div>
				<MyNetWorkUserList />
			</div>
		</div>
	);
}
