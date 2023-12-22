import React from "react";

interface AboutUsProps {
	data: {
		heading: string;
		text: string;
		image: string;
		id: string;
	};
}

export default function AboutUs({ data }: AboutUsProps) {
	return (
		<div className="about-us__list-item" id={data.id}>
			<h2 className="item-heading">{data.heading}</h2>

			<div className="item-content">
				<p className="item-content__text">{data.text}</p>

				<div className="item-content__image">
					<img src={data.image} alt={data.heading} />
				</div>
			</div>
		</div>
	);
}
