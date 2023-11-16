import type { Metadata } from "next";
import Provider from "./providers";
import { Inter } from "next/font/google";
import "../styles/main.scss";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Ecole de Criminologie",
	description: "located in Democratic Republic of the Congo",
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" className={inter.className}>
			<body>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
