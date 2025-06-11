"use client";

import React, { useState, useEffect } from "react";
import {
	faculties,
	level1,
	level2,
	level3,
	level4,
	level5,
} from "@/data/faculty/faculty";
import Cards from "./Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Items {
	name: string;
	qualification: string[];
	areaOfStudy: string;
	departmentName: string;
	image: string;
	salutation: string;
}

type List = React.JSX.Element[];

export default function Faculty() {
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

	const list1 = level1.map((item) => {
		return (
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

	const list2 = level2.map((item) => {
		return (
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

	const list3 = level3.map((item) => {
		return (
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

	const list4 = level4.map((item) => {
		return (
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

	const list5 = level5.map((item) => {
		return (
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
				<h1>Personnel academique et scientifique</h1>
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
				{search.length >= 1 ? (
					<div className="info-page__container faculty">{list}</div>
				) : (
					<>
						<div className="info-page__container faculty faculty-level1">
							{list1}
						</div>

						<div className="info-page__container faculty faculty-level2">
							{list2}
						</div>

						<div className="info-page__container faculty faculty-level3">
							{list3}
						</div>

						<div className="info-page__container faculty faculty-level4">
							{list4}
						</div>

						<div className="info-page__container faculty faculty-level5">
							{list5}
						</div>
					</>
				)}
			</div>
		</>
	);
}
