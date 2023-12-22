"use client";

import React, { useCallback } from "react";
import Item from "./Item";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface BannerProps {
	data: {
		heading: string;
		text: string;
		image: string;
	}[];
}

export default function Banner({ data }: BannerProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	let banners = data.map((item) => {
		return (
			<Item
				key={item.heading}
				heading={item.heading}
				text={item.text}
				image={item.image}
			/>
		);
	});

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
