import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/main.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { GoogleAnalytics } from "@next/third-parties/google";
config.autoAddCss = false;

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
			<body>{children}</body>
			<GoogleAnalytics gaId="G-JNBVBFSCTG" />
		</html>
	);
}
