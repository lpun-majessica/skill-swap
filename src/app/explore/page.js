import Filter from "@/components/filter";
import { SearchBar } from "@/components/search-bar";
import { RecommendedUserList } from "@/components/user-list/recommended-user-list";

export default function ExplorePage() {
	return (
	  <div className="flex flex-col sm:flex-row items-start min-h-screen px-4 sm:px-6 lg:px-8 py-6 gap-2 lg:gap-3">
		<div className="flex flex-col items-center mr-4 sm:mr-6 lg:mr-8">
		  <Filter />
		</div>
  
		<div className="w-full max-w-screen-2xl mx-auto">
		  <div className="flex flex-col justify-start items-start mb-6">
			<h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-ss-black-717 dark:text-ss-light-555">
			  Recommended for you
			</h1>
  
			<div className="mt-4">
			  <SearchBar placeholder="Search username" />
			</div>
		  </div>
  
		  <RecommendedUserList />
		</div>
	  </div>
	);
  }