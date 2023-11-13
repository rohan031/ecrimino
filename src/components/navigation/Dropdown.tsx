import React from "react";
import Items from "./Items";

export default function Dropdown() {
	return (
		<div className="dropdown" tabIndex={0}>
			<Items />
			<Items />
			<Items />
			<Items />
			<Items />
			<Items />
		</div>
	);
}
