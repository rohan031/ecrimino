import React from "react";
import { masters } from "@/data/academics/data";
import Heading from "../components/Heading";
import Courses from "../components/Courses";

export default function page() {
	return (
		<>
			<Heading classname="masters" heading={masters.heading} />

			<div className="container">
				<div className="academics-details">
					<p className="academics-details__text">{masters.text}</p>

					<div className="academics-details__courses">
						<h2 className="courses-heading">Programs Offered</h2>

						<Courses courses={masters.parts} />
					</div>
				</div>
			</div>
		</>
	);
}
