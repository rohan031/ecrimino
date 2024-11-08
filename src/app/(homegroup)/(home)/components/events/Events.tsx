import React from "react";
import Cards from "./Cards";
import Link from "next/link";
import { NewsData } from "../../page";

interface EventsProps {
	news: NewsData[];
}

const Events = ({ news }: EventsProps) => {
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
