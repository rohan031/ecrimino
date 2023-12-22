import React from "react";
import { certifications } from "@/data/academics/data";
import Heading from "../components/Heading";
import Courses from "../components/Courses";

export default function page() {
	return (
		<>
			<Heading
				classname="certifications"
				heading={certifications.heading}
			/>

			<div className="container">
				<div className="academics-details">
					<p className="academics-details__text">
						{certifications.text}
					</p>

					<div className="academics-details__courses">
						<h2 className="courses-heading">Programs Offered</h2>

						<Courses courses={certifications.parts} />
					</div>
				</div>
			</div>
		</>
	);
}
