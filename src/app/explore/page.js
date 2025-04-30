import { RecommendedUserList } from "@/components/user-list/recommended-user-list";

export default function ExplorePage() {
	return (
		<div className="flex flex-row items-start min-h-screen px-20 py-10">
			{/* Filter */}
			<div className="flex flex-col items-center mr-8">
				<h1 className="text-4xl font-bold mb-4">Filter</h1>
				<p className="mb-8">Select your preferences.</p>
				<div className="bg-white shadow-md rounded-lg p-4">
					<h2 className="text-xl font-bold">Filter Options</h2>
					{/* Add filter options here */}
				</div>
			</div>
			{/* Main content */}
			<div>
				<h1 className="sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-ss-black-717 dark:text-ss-light-555">
					Recommended for you
				</h1>

				<RecommendedUserList />
			</div>
		</div>
	);
}
