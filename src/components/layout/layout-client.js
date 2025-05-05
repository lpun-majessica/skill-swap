"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function LayoutClient({ children }) {
	const pathname = usePathname();
	const hideLayout = pathname === "/login";
	const isHomePage = pathname === "/";

	return (
		<div className="flex flex-col min-h-screen">
			{!hideLayout && <Navbar />}
			<main
				className={`${
					!hideLayout && !isHomePage ? "pt-16" : ""
				} grow overflow-auto`}
			>
				{children}
			</main>
			{!hideLayout && <Footer />}
		</div>
	);
}
