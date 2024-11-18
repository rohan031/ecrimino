// "use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface CardsProps {
	img: string;
	heading: string;
	date: string;
	text?: string;
	link: string;
}

export default function Cards({ img, heading, date, text, link }: CardsProps) {
	let d = new Date(date);
	return (
		<div className="events-container__item">
			<div className="events-container__item-img">
				<img
					src={img}
					alt="heading"
					loading="lazy"
					width="179"
					height="231"
				/>
			</div>

			<div className="events-container__item-info">
				<h3 title={heading}>
					{heading.substring(0, 50).toLowerCase() + "..."}
				</h3>

				<p>{d.toDateString()}</p>

				<p title={text}>{text}</p>

				<div>
					<a href={link} target="_blank">
						En savoir plus
						<FontAwesomeIcon icon={faAngleRight} />
					</a>
				</div>
			</div>
		</div>
	);
}
