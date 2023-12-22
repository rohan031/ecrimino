import Navigation from "@/components/navigation/Navigation";
import { nav } from "@/data/common/data";
import React from "react";

interface HomeRoutesLayoutProps {
	children: React.ReactNode;
}

export default function HomeRoutesLayout({ children }: HomeRoutesLayoutProps) {
	return (
		<>
			<Navigation data={nav} />
			{children}
		</>
	);
}
