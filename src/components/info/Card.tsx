import React from "react";

interface CardProps {
	image: string;
	heading: string;
	text: string;
	link: string;
}

export default function Card({ image, heading, text, link }: CardProps) {
	return (
		<div className="info-items__child embla__slide">
			<div className="info-items__child-container">
				<img src={image} alt={heading} loading="lazy" />
			</div>

			<div className="info-items__child-container">
				<h3>{heading}</h3>

				<p>{text}</p>

				<a href={link}>Know More</a>
			</div>
		</div>
	);
}
