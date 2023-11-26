"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Card from "@/components/info/Card";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Cards = React.JSX.Element[];

export default function Academics() {
	const { t } = useTranslation();
	const [emblaRef, emblaApi] = useEmblaCarousel({}, [Autoplay()]);

	let cards: Cards = [];
	for (let i = 1; i <= 3; i++) {
		cards.push(
			<Card
				key={i}
				id={i}
				image={`/academics/academics${i}.jpg`}
				text={t(`academics.card${i}`)}
				sub={t(`academics.card${i}sub`)}
				link="academics"
			/>
		);
	}

	return (
		<div className="info">
			<div className="container">
				<h2 className="info-head">{t("academics.head")}</h2>

				<p className="info-text">{t("academics.text")}</p>

				<div className="info-cards embla" ref={emblaRef}>
					<div className="info-items embla__container">{cards}</div>
				</div>
			</div>
		</div>
	);
}
