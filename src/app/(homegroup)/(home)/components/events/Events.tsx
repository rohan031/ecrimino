"use client";

import React, { useEffect, useState } from "react";
import Cards from "./Cards";

interface NewsData {
	title: string;
	link: string;
	text: string;
	image: string;
	id: string;
	createdAt: string;
}

export default function Events() {
	const [news, setNews] = useState<NewsData[] | null>(null);

	useEffect(() => {
		const url = "https://api.adgytec.in/v1/services/news";

		fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				// if (!res.error) {
				// 	return;
				// }

				setNews(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const cards = news?.map((item) => {
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
		<div className="events" id="events">
			<div className="container">
				<h2 className="events-head">Événement</h2>

				<div className="events-container">{cards}</div>
			</div>
		</div>
	);
}
