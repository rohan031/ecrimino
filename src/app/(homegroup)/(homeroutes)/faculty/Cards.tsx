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
				<h3>{salutation + " " + name}</h3>

				<p title={departmentName}>{departmentName}</p>

				<p title={areaOfStudy}>
					{displayAreaOfStudy +
						`${displayAreaOfStudy === areaOfStudy ? "" : "..."}`}
				</p>

				<p title={qualification}>{qualification}</p>
			</div>
		</div>
	);
}
