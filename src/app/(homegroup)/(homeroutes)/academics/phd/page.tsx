import React from "react";
import { phd } from "@/data/academics/data";
import Heading from "../components/Heading";
import Courses from "../components/Courses";

export default function page() {
	return (
		<>
			<Heading classname="phd" heading={phd.heading} />

			<div className="container">
				<div className="academics-details">
					<div>
						<p className="academics-details__text">{phd.text}</p>
					</div>

					<div className="academics-details__courses">
						<h2 className="courses-heading">Programs Offered</h2>

						<Courses courses={phd.parts} />
					</div>
				</div>
			</div>
		</>
	);
}
