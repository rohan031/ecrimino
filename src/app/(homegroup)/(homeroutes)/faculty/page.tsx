"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { faculties } from "@/data/faculty";
import Cards from "./Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Items {
	name: string;
	qualification: string;
	areaOfStudy: string;
	departmentName: string;
	image: string;
	salutation: string;
}

type List = React.JSX.Element[];

export default function Faculty() {
	const { t } = useTranslation("translation");
	const [search, setSearch] = useState("");
	const [items, setItems] = useState<Items[]>();

	useEffect(() => {
		setItems(faculties);
	}, []);

	const list: List = [];

	items?.forEach((item) => {
		if (item.name.toLowerCase().indexOf(search.toLowerCase()) === -1) {
			return;
		}

		list.push(
			<Cards
				key={item.image}
				name={item.name}
				qualification={item.qualification}
				areaOfStudy={item.areaOfStudy}
				departmentName={item.departmentName}
				image={item.image}
				salutation={item.salutation}
			/>
		);
	});

	return (
		<>
			<div className="info-page__heading faculty">
				<h1>{t("faculty.faculty")}</h1>
			</div>

			<div className="faculty-search">
				<div className="container">
					<div className="faculty-search__cont">
						<input
							type="text"
							placeholder="Search across all Faculty profiles..."
							onChange={(e) => setSearch(e.target.value)}
							value={search}
						/>

						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</div>
				</div>
			</div>

			<div className="container">
				<div className="info-page__container faculty">{list}</div>
			</div>
		</>
	);
}
