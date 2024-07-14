"use client";

import React, { useState, useEffect } from "react";
import { docs } from "@/data/doc";
import Cards from "./Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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
	const [open, setOpen] = useState("");

	useEffect(() => {
		setItems(docs);
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;

		if (open === name) {
			setOpen("");
		} else {
			setOpen(name);
		}
	};

	const sections = items?.map((section, index) => {
		const { items, heading } = section;
		const cards = items?.map((item) => {
			return <Cards key={item.id} title={item.title} link={item.link} />;
		});

		return (
			<div className="doc-section" key={heading}>
				<input
					type="checkbox"
					id={heading}
					name={heading}
					checked={open === heading}
					onChange={handleChange}
				/>
				<h2>
					<label htmlFor={heading}>
						{heading}

						<FontAwesomeIcon icon={faAngleDown} />
					</label>
				</h2>
				<div className="doc-section-items">
					<div className="doc-items">{cards}</div>
				</div>
			</div>
		);
	});

	return (
		<>
			<div className="info-page__heading doc">
				<h1>Documents</h1>
			</div>

			<div className="container doc-container">{sections}</div>
		</>
	);
}
