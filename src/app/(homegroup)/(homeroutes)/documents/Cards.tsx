import Image from "next/image";
import React from "react";

interface CardsProps {
	title: string;
	link: string;
}

export default function Cards({ title, link }: CardsProps) {
	let image = () => {
		let type = title.slice(-3);

		if (type === "pdf") {
			return (
				<Image
					src="/documents/pdf.png"
					alt="pdf"
					loading="lazy"
					width="138"
					height="161"
				/>
			);
		} else {
			return (
				<Image
					src="/documents/doc.png"
					alt="doc"
					loading="lazy"
					width="138"
					height="161"
				/>
			);
		}
	};

	let displayTitle = title.substring(0, 50);

	return (
		<div className="doc-item">
			<div className="doc-item__image">{image()}</div>

			<a
				href={link}
				target="_blank"
				className="doc-item__title"
				title={title}
			>
				{displayTitle.toLowerCase() +
					` ${displayTitle === title ? "" : "..."}`}
			</a>
		</div>
	);
}
