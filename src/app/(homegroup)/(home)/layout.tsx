import Navigation from "@/components/navigation/Navigation";
import Nav from "./components/nav/Nav";
import { nav } from "@/data/common/data";

interface HomeLayoutProps {
	children: React.ReactNode;
}

function HomeLayout({ children }: HomeLayoutProps) {
	return (
		<>
			<Nav />
			<Navigation data={nav} />
			{children}
		</>
	);
}

export default HomeLayout;
