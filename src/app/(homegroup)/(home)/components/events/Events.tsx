import React from "react";
import Cards from "./Cards";

interface EventProps {
	data: {
		img: string;
		heading: string;
		date: string;
		text: string;
		link: string;
	}[];
}

export default function Events({ data }: EventProps) {
	const cards = data?.map((item) => {
		return (
			<Cards
				key={item.heading}
				img={item.img}
				heading={item.heading}
				date={item.date}
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
