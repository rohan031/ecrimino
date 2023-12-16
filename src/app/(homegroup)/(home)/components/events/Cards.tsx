// "use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface CardsProps {
	img: string;
	heading: string;
	date: string;
	text: string;
	link: string;
}

export default function Cards({ img, heading, date, text, link }: CardsProps) {
	return (
		<div className="events-container__item">
			<div className="events-container__item-img">
				<img src={img} alt="heading" loading="lazy" />
			</div>

			<div className="events-container__item-info">
				<h3>{heading.substring(0, 50) + "..."}</h3>

				<p>{date}</p>

				<p>{text.substring(0, 50) + "..."}</p>

				<div>
					<a href={link} target="_blank">
						Know More
						<FontAwesomeIcon icon={faAngleRight} />
					</a>
				</div>
			</div>
		</div>
	);
}
