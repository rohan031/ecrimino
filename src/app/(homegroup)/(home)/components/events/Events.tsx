"use client";

import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Loader from "@/components/loader/Loader";
import Link from "next/link";

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
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const url = `${process.env.NEXT_PUBLIC_API}/services/news`;

		fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					throw new Error(res.message);
				}

				setNews(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
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
		<div className="events" id="news">
			<div className="container">
				<h2 className="events-head">Actualité</h2>

				{loading ? (
					<div
						style={{
							height: "25vb",
						}}
					>
						<Loader />
					</div>
				) : !news || news?.length === 0 ? (
					<div
						style={{
							height: "25vb",
							display: "grid",
							placeItems: "center",
						}}
					>
						<p
							style={{
								fontSize: "1.5rem",
							}}
						>
							No news to display
						</p>
					</div>
				) : (
					<div className="events-items">
						<div className="events-container">{cards}</div>
						<div className="events-action">
							<Link href="/blogs">Voir tout</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
