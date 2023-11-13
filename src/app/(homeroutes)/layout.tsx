import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import React from "react";

interface HomeLayoutProps {
	children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
	return (
		<>
			<Navigation />
			{children}
			<Footer />
		</>
	);
}
