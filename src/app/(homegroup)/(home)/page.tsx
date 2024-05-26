import Banner from "./components/banner/Banner";
import Cards from "./components/Cards/Cards";
import Events from "./components/events/Events";

import { banner, academics, ccps } from "@/data/home/data";

export default function Home() {
	return (
		<>
			<Banner data={banner} />
			<Cards data={academics} />
			<Cards data={ccps} />
			<Events />
		</>
	);
}
