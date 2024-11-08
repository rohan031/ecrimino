import React from "react";
import Cards from "./Cards";
import Link from "next/link";

const revalidate = 60 * 60; // revalidate before image expiry

interface NewsData {
	title: string;
	link: string;
	text: string;
	image: string;
	id: string;
	createdAt: string;
}

const Events = async () => {
	const url = `${process.env.NEXT_PUBLIC_API}/services/news`;

	const news: NewsData[] | null = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
		},
		next: {
			revalidate,
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

	if (!news) {
		return <></>;
	}

	const cards = news.map((item) => {
		return (
			<Cards
				key={item.id}
				img={item.image}
				heading={item.title}
				date={item.createdAt}
				text={item.text}
				link={item.link}
			/>
		);
	});

	return (
		<div className="events" id="news">
			<div className="container">
				<h2 className="events-head">Actualité</h2>

				<div className="events-items">
					<div className="events-container">{cards}</div>
					<div className="events-action">
						<Link href="/blogs">Voir tout</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Events;
