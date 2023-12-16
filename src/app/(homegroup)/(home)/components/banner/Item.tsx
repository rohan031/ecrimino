import React from "react";
import Image from "next/image";

import banner1 from "@/../public/banner/banner1.WebP";
import banner2 from "@/../public/banner/banner2.WebP";
import banner3 from "@/../public/banner/banner3.WebP";
import banner4 from "@/../public/banner/banner4.WebP";

interface ItemProps {
	content: string;
	heading: string;
	id: number;
}

export default function Item({ content, heading, id }: ItemProps) {
	const image = () => {
		switch (id) {
			case 1:
				return <Image src={banner1} alt="banner image" />;
			case 2:
				return <Image src={banner2} alt="banner image" />;
			case 3:
				return <Image src={banner3} alt="banner image" />;
			case 4:
				return <Image src={banner4} alt="banner image" />;
		}
	};

	return (
		<div className="banners-item embla__slide">
			<div className="container banner-item">
				<div className="banner-item__child">
					<h2 className="banner-item__child-head">{heading}</h2>
				</div>

				<div className="banner-item__child">
					<div className="banner-item__child-text">
						<p>{content}</p>
					</div>

					<div className="banner-item__child-image">{image()}</div>
				</div>
			</div>
		</div>
	);
}
