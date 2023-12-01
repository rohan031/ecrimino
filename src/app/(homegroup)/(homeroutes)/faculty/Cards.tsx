import React from "react";

interface CardsProps {
	name: string;
	qualification: string;
	areaOfStudy: string;
	departmentName: string;
	image: string;
	salutation: string;
}

export default function Cards({
	name,
	qualification,
	areaOfStudy,
	departmentName,
	image,
	salutation,
}: CardsProps) {
	let displayAreaOfStudy = areaOfStudy.substring(0, 50);

	return (
		<div className="faculty-item">
			<div className="faculty-item__image">
				<img src={image} alt={name} />
			</div>

			<div className="faculty-item__info">
				<h3>{salutation.toLowerCase() + " " + name.toLowerCase()}</h3>

				<p title={qualification}>{qualification.toLowerCase()}</p>

				<p title={areaOfStudy}>
					{displayAreaOfStudy.toLowerCase() +
						`${displayAreaOfStudy === areaOfStudy ? "" : "..."}`}
				</p>

				<p title={departmentName}>{departmentName.toLowerCase()}</p>
			</div>
		</div>
	);
}
