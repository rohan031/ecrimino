import Image from "next/image";
import React from "react";

interface ItemProps {
	text: string;
	heading: string;
	image: string;
}

export default function Item({ text, heading, image }: ItemProps) {
	return (
		<div className="banners-item embla__slide">
			<div className="container banner-item">
				<div className="banner-item__child">
					<h2 className="banner-item__child-head">{heading}</h2>
				</div>

				<div className="banner-item__child">
					<div className="banner-item__child-text">
						<p>{text}</p>
					</div>

					<div className="banner-item__child-image">
						{
							<Image
								src={image}
								alt={heading}
								width="742"
								height="288"
								priority={true}
							/>
						}
					</div>
				</div>
			</div>
		</div>
	);
}
