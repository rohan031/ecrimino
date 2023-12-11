import Footer from "@/components/footer/Footer";
import React from "react";

interface HomeGroupLayoutProps {
	children: React.ReactNode;
}

export default function HomeGroupLayout({ children }: HomeGroupLayoutProps) {
	return (
		<>
			{children}
			<Footer />
		</>
	);
}
