import Navigation from "@/components/navigation/Navigation";
import React from "react";

interface HomeRoutesLayoutProps {
	children: React.ReactNode;
}

export default function HomeRoutesLayout({ children }: HomeRoutesLayoutProps) {
	return (
		<>
			<Navigation />
			{children}
		</>
	);
}
