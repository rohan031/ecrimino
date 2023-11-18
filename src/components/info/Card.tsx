"use client";

import React from "react";
import { useTranslation } from "react-i18next";

interface CardProps {
	id: number;
	text: string;
	image: string;
	sub: string;
}

export default function Card({ id, text, image, sub }: CardProps) {
	const { t } = useTranslation();

	return (
		<div className="info-items__child embla__slide">
			<div className="info-items__child-container">
				<img src={image} alt={text} />
			</div>

			<div className="info-items__child-container">
				<h3>{text}</h3>

				<p>{sub}</p>

				<a href={`/academics/${id}`}>{t("common.knowMore")}</a>
			</div>
		</div>
	);
}
