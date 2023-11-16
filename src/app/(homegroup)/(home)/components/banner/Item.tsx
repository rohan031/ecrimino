import React from "react";

interface ItemProps {
	content: string;
	heading: string;
	id: number;
}

export default function Item({ content, heading, id }: ItemProps) {
	const image = () => {
		switch (id) {
			case 1:
				return <img src="/banner1.jpg" />;

			case 2:
				return <img src="/banner2.png" />;
			case 3:
				return <img src="banner3.png" />;
			case 4:
				return <img src="banner4.jpg" />;
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
