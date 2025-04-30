import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DataProvider } from "@/contexts/data-context";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
	title: "SkillSwap",
	description: "SkillSwap - A platform for skill exchange",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body>
				<DataProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<Navbar />
						{children}
						<Footer />
					</ThemeProvider>
					<Toaster />
				</DataProvider>
			</body>
		</html>
	);
}
