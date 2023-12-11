"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Card from "@/components/info/Card";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Cards = React.JSX.Element[];

export default function CCPS() {
	const { t } = useTranslation();
	const [emblaRef, emblaApi] = useEmblaCarousel({}, [Autoplay()]);

	let cards: Cards = [];
	for (let i = 1; i <= 3; i++) {
		cards.push(
			<Card
				key={i}
				id={i}
				image={`/ccps/ccps${i}.jpg`}
				text={t(`ccps.card${i}`)}
				sub={t(`ccps.card${i}sub`)}
				link="ccps"
			/>
		);
	}

	return (
		<div className="info">
			<div className="container">
				<h2 className="info-head">{t("ccps.head")}</h2>

				<p className="info-text">{t("ccps.text")}</p>

				<div className="info-cards embla" ref={emblaRef}>
					<div className="info-items embla__container">{cards}</div>
				</div>
			</div>
		</div>
	);
}
