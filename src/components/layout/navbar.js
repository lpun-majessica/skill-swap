"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, Bell } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Logo from "./logo";
import { useTheme } from "next-themes";
import { ModeToggle } from "../common/mode-toggle";
import { navItems } from "@/lib/constant";

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname();
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle for demo purposes

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		handleScroll();

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// For demo, toggle login state
	const toggleLogin = () => {
		setIsLoggedIn(!isLoggedIn);
	};

	const { resolvedTheme } = useTheme();
	const isDarkMode = resolvedTheme === "dark";

	return (
		<nav
			className={clsx(
				"fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
				scrolled
					? "bg-white dark:bg-ss-black-717 shadow-md border-gray-200 dark:border-ss-black-131"
					: "bg-transparent border-transparent"
			)}
		>
			<div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
				{/* Left: Logo + Nav */}
				<div className="flex items-center gap-8">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2">
						{scrolled && !isDarkMode ? <Logo variant="dark" /> : <Logo />}
						<span className="font-bold text-lg text-black dark:text-white">
							SkillSwap
						</span>
					</Link>

					{/* Desktop nav */}
					<div className="hidden md:flex gap-6 items-center">
						{navItems.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.href}
									href={item.href}
									className="relative transition px-1 py-2 group text-black dark:text-white focus:outline-none focus:ring-0"
								>
									{item.label}
									<span
										className={clsx(
											"absolute bottom-0 left-0 w-full h-[2px] transition-opacity duration-300",
											isActive
												? "bg-ss-red-505 opacity-100"
												: "bg-ss-red-505 opacity-0 group-hover:opacity-100"
										)}
									/>
								</Link>
							);
						})}
					</div>
				</div>

				{/* Right: Login or User Info */}
				<div className="hidden md:flex items-center gap-4">
					{isLoggedIn ? (
						<>
							<Link
								href="/my-network"
								className="px-4 py-1 bg-ss-red-505 text-white rounded-full hover:bg-red-700 transition"
							>
								My Network
							</Link>
							<Button variant="ghost" size="icon">
								<Bell />
							</Button>
							<div className="w-8 h-8 rounded-full overflow-hidden">
								<Image
									src="/pfp/1.jpeg"
									width={100}
									height={100}
									alt="User Profile"
								/>
							</div>
						</>
					) : (
						<Button
							onClick={toggleLogin}
							className="px-4 py-1 rounded-full transition text-white bg-ss-red-505 hover:bg-red-700 h-auto border-0"
						>
							Log in
						</Button>
					)}
					<ModeToggle />
				</div>

				{/* Mobile menu button and controls */}
				<div className="md:hidden flex items-center gap-2">
					{isLoggedIn && (
						<>
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<Bell />
							</Button>
							<div className="w-7 h-7 rounded-full overflow-hidden">
								<Image
									src="/pfp/1.jpeg"
									width={80}
									height={80}
									alt="User Profile"
								/>
							</div>
						</>
					)}
					<ModeToggle />
					<Button onClick={() => setMenuOpen(!menuOpen)} variant="ghost">
						{menuOpen ? <X /> : <Menu />}
					</Button>
				</div>
			</div>

			{/* Mobile menu */}
			{menuOpen && (
				<div className="md:hidden px-4 pb-4 flex flex-col gap-4 items-center text-center bg-white dark:bg-black text-black dark:text-white shadow-lg">
					<div className="w-full pt-2" />
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								className={clsx(
									"relative group transition py-2 w-full",
									isActive && "font-bold"
								)}
							>
								{item.label}
							</Link>
						);
					})}
					{isLoggedIn ? (
						<Button className="px-4 py-1 bg-ss-red-505 text-white rounded-full hover:bg-red-700 transition w-full mt-2 h-auto border-0">
							My Network
						</Button>
					) : (
						<Button
							onClick={toggleLogin}
							className="px-4 py-1 bg-ss-red-505 text-white rounded-full hover:bg-red-700 transition w-full mt-2 h-auto border-0"
						>
							Log in
						</Button>
					)}
				</div>
			)}
		</nav>
	);
}
