import Footer from "@/components/footer/Footer";
import Navigation from "@/components/navigation/Navigation";
import Nav from "./components/Nav";

interface HomeLayoutProps {
	children: React.ReactNode;
}

function HomeLayout({ children }: HomeLayoutProps) {
	return (
		<>
			<Nav />
			<Navigation />
			{children}
			<Footer />
		</>
	);
}

export default HomeLayout;
