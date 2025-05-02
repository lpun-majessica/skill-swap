import Filter from "@/components/filter";
import { RecommendedUserList } from "@/components/user-list/recommended-user-list";

export default function ExplorePage() {
	return (
		<div className="flex flex-col sm:flex-row items-start min-h-screen px-10 py-15 gap-2 lg:gap-3">
			<div className="flex flex-col items-center mr-8">
				<Filter />
			</div>

			<div className="mx-auto">
				<h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-ss-black-717 dark:text-ss-light-555">
					Recommended for you
				</h1>

				<RecommendedUserList />
			</div>
		</div>
	);
}
