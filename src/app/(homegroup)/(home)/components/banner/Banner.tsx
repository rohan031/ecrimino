"use client";

import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import Item from "./Item";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

type Banners = React.JSX.Element[];

export default function Banner() {
	const { t } = useTranslation();
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	let banners: Banners = [];
	for (let i = 1; i <= 4; i++) {
		banners.push(
			<Item
				key={i}
				id={i}
				heading={t("banner.bannerHead")}
				content={t(`banner.banner${i}Content`)}
			/>
		);
	}

	return (
		<div className="embla-parent">
			<div className="banners embla" ref={emblaRef}>
				<div className="embla__container">{banners}</div>
			</div>

			<button
				className="embla-parent__button button-prev"
				onClick={scrollPrev}
				aria-label="prev banner"
			>
				<FontAwesomeIcon icon={faChevronLeft} />
			</button>
			<button
				className="embla-parent__button button-next"
				onClick={scrollNext}
				aria-label="next banner"
			>
				<FontAwesomeIcon icon={faChevronRight} />
			</button>
		</div>
	);
}
