"use client";

import React, { useState, useEffect } from "react";
import { events } from "@/data/events";
import Cards from "./Cards";

interface Event {
	img: string;
	heading: string;
	date: string;
	text: string;
	link: string;
}

export default function Events() {
	const [event, setEvent] = useState<Event[]>();

	useEffect(() => {
		setEvent(events);
	}, []);

	const cards = event?.map((item) => {
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
				<h2 className="events-head">Events</h2>

				<div className="events-container">{cards}</div>
			</div>
		</div>
	);
}
