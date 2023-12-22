import React from "react";
import { ccps as aboutUs } from "@/data/about-us/data";
import Heading from "../../academics/components/Heading";
import AboutUs from "@/components/about-us/AboutUs";

export default function Aboutus() {
	const items = aboutUs.map((item) => {
		return <AboutUs key={item.id} data={item} />;
	});

	return (
		<>
			<Heading heading="A propos de nous" classname="about-us" />

			<div className="about-us__list">{items}</div>
		</>
	);
}
