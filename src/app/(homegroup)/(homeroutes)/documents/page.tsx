"use client";

import React, { useState, useEffect } from "react";
import { docs } from "@/data/doc";
import Cards from "./Cards";

interface Item {
	id: string;
	title: string;
	link: string;
}

interface Docs {
	heading: string;
	items: Item[];
}

export default function Documents() {
	const [items, setItems] = useState<Docs[]>();
	useEffect(() => {
		setItems(docs);
	}, []);

	const sections = items?.map((section, index) => {
		const { items, heading } = section;
		const cards = items?.map((item) => {
			return <Cards key={item.id} title={item.title} link={item.link} />;
		});

		return (
			<div className="doc-section" key={heading}>
				<h2>{heading}</h2>
				<div className="info-page__container doc">{cards}</div>
			</div>
		);
	});

	return (
		<>
			<div className="info-page__heading doc">
				<h1>Documents</h1>
			</div>

			<div className="container">{sections}</div>
		</>
	);
}
