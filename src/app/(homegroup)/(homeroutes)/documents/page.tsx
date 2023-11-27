"use client";

import React, { useState, useEffect } from "react";
import { docs } from "@/data/doc";
import Cards from "./Cards";

interface Items {
	id: string;
	title: string;
	link: string;
	type: string;
}

export default function Documents() {
	const [items, setItems] = useState<Items[]>();

	useEffect(() => {
		setItems(docs);
	}, []);

	const cards = items?.map((item) => {
		return (
			<Cards
				key={item.id}
				title={item.title}
				link={item.link}
				type={item.type}
			/>
		);
	});

	return (
		<>
			<div className="info-page__heading doc">
				<h1>Documents</h1>
			</div>

			<div className="container">
				<div className="info-page__container doc">{cards}</div>
			</div>
		</>
	);
}
