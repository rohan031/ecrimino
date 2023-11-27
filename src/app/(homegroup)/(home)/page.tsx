import Academics from "./components/academics/Academics";
import Banner from "./components/banner/Banner";
import CCPS from "./components/ccps/CCPS";
import Events from "./components/events/Events";

export default function Home() {
	return (
		<>
			<Banner />
			<Academics />
			<CCPS />
			<Events />
		</>
	);
}
