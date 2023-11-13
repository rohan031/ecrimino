import type { Metadata } from "next";
import Provider from "./providers";
import "../styles/main.scss";

export const metadata: Metadata = {
	title: "Ecole de Criminologie",
	description: "located in Democratic Republic of the Congo",
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<head>
				<link
					href="https://fonts.cdnfonts.com/css/helvetica-255"
					rel="stylesheet"
				/>
			</head>
			<body>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
