import Footer from "@/components/footer/Footer";
import React from "react";

import { footer } from "@/data/common/data";

interface HomeGroupLayoutProps {
	children: React.ReactNode;
}

export default function HomeGroupLayout({ children }: HomeGroupLayoutProps) {
	return (
		<>
			{children}
			<Footer data={footer} />
		</>
	);
}
