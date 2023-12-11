import React from "react";

interface CardsProps {
	title: string;
	link: string;
}

export default function Cards({ title, link }: CardsProps) {
	let image = () => {
		let type = title.slice(-3);

		if (type === "pdf") {
			return <img src="/documents/pdf.png" alt="pdf" />;
		} else {
			return <img src="/documents/doc.png" alt="doc" />;
		}
	};

	let displayTitle = title.substring(0, 50);
	console.log(displayTitle);

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
