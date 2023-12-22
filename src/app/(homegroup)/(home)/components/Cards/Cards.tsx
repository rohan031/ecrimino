"use client";

import React from "react";
import Card from "@/components/info/Card";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface CardsProps {
	data: {
		heading: string;
		text: string;
		text2?: string;
		cards: {
			heading: string;
			text: string;
			image: string;
			link: string;
		}[];
	};
}

export default function Cards({ data }: CardsProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({}, [Autoplay()]);

	let cards = data.cards.map((card) => {
		return (
			<Card
				key={card.heading}
				image={card.image}
				link={card.link}
				heading={card.heading}
				text={card.text}
			/>
		);
	});

	return (
		<div className="info">
			<div className="container">
				<h2 className="info-head">{data.heading}</h2>

				<div className="info-text">
					<p>{data.text}</p>

					{data.text2 && <p>{data.text2}</p>}
				</div>

				<div className="info-cards embla" ref={emblaRef}>
					<div className="info-items embla__container">{cards}</div>
				</div>
			</div>
		</div>
	);
}
