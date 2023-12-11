import Navigation from "@/components/navigation/Navigation";
import Nav from "./components/nav/Nav";

interface HomeLayoutProps {
	children: React.ReactNode;
}

function HomeLayout({ children }: HomeLayoutProps) {
	return (
		<>
			<Nav />
			<Navigation />
			{children}
		</>
	);
}

export default HomeLayout;
