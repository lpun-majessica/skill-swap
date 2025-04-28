"use client";

import Link from "next/link";
import { Facebook, Twitter, Github } from "lucide-react";
import Logo from "./logo";
import { navItems } from "@/lib/constant";

export default function Footer() {
	return (
		<footer className="w-full py-8 border-t bg-white dark:bg-ss-black-717 border-gray-200 dark:border-ss-black-929 text-black dark:text-white">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center mb-8">
					<Link href="/" className="flex items-center gap-2 mb-6 md:mb-0">
						<Logo displayOption="hidden dark:block" />
						<Logo variant="dark" displayOption="block dark:hidden" />
						<span className="font-bold text-lg">SkillSwap</span>
					</Link>

					<div className="flex gap-8">
						{navItems.map((item) => (
							<Link key={item.href} href={item.href}>
								{item.label}
							</Link>
						))}
					</div>
				</div>

				<div className="w-full h-px mb-8 bg-gray-200 dark:bg-ss-black-929"></div>

				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="flex gap-4 mb-4 md:mb-0">
						<Link href="#">
							<Facebook size={20} />
						</Link>
						<Link href="#">
							<Twitter size={20} />
						</Link>
						<Link href="#">
							<Github size={20} />
						</Link>
					</div>

					{/* Copyright */}
					<div className="text-sm">© 2025 SkillSwap. All rights reserved.</div>
				</div>
			</div>
		</footer>
	);
}
