import React from "react";

interface CardsProps {
	title: string;
	link: string;
	type: string;
}

export default function Cards({ title, link, type }: CardsProps) {
	let image = () => {
		if (type === "doc") {
			return <img src="/documents/doc.png" alt="doc" />;
		}

		if (type === "pdf") {
			return <img src="/documents/pdf.png" alt="pdf" />;
		}
	};

	return (
		<div className="doc-item">
			<div className="doc-item__image">{image()}</div>

			<a href={link} target="_blank" className="doc-item__title">
				Title: {title}
			</a>
		</div>
	);
}
