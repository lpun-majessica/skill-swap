import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

const sharedClass = "text-xs lg:text-sm w-18 h-8 lg:w-22 lg:h-10 rounded-4xl";
const displayOptions = `${sharedClass} shadow-sm/20 hover:shadow-xs/20 bg-ss-light-777 hover:bg-ss-light-222 dark:bg-ss-black-131 dark:hover:bg-ss-black-444 text-ss-black-131 dark:text-ss-light-555`;
const disabledOptions = `${sharedClass} bg-ss-light-777 dark:bg-ss-black-131 text-ss-black-131/60 dark:text-ss-light-555/60`;

export function PrevButton({ disabled, setCurrentPage }) {
	return (
		<>
			{disabled ? (
				<Button
					className={`${disabledOptions} rounded-l-xl rounded-r-none`}
					disabled
				>
					<ChevronLeft />
					Prev
				</Button>
			) : (
				<Button
					className={`${displayOptions} rounded-l-xl rounded-r-none border-r`}
					onClick={() => setCurrentPage((currPage) => currPage - 1)}
				>
					<ChevronLeft />
					Prev
				</Button>
			)}
		</>
	);
}

export function NextButton({ disabled, setCurrentPage }) {
	return (
		<>
			{disabled ? (
				<Button
					className={`${disabledOptions} rounded-l-none rounded-r-xl`}
					disabled
				>
					Next <ChevronRight />
				</Button>
			) : (
				<Button
					className={`${displayOptions} rounded-l-none rounded-r-xl border-l`}
					onClick={() => setCurrentPage((currPage) => currPage + 1)}
				>
					Next <ChevronRight />
				</Button>
			)}
		</>
	);
}
