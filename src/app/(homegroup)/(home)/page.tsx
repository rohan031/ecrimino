import Banner from "./components/banner/Banner";
import Cards from "./components/Cards/Cards";
import Events from "./components/events/Events";

import { banner, academics, ccps } from "@/data/home/data";

export const revalidate = 60 * 60;

export interface NewsData {
	title: string;
	link: string;
	text: string;
	image: string;
	id: string;
	createdAt: string;
}

export default async function Home() {
	const url = `${process.env.NEXT_PUBLIC_API}/services/news`;
	const news: NewsData[] | null = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
		},
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.error) throw new Error(res.message);
			return res.data;
		})
		.catch((err) => {
			console.error(err.message);
			return null;
		});

	return (
		<>
			<Banner data={banner} />
			<Cards data={academics} />
			<Cards data={ccps} />
			{news && <Events news={news} />}
		</>
	);
}
