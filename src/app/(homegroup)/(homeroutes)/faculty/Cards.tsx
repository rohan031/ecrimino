import Image from "next/image";
import React from "react";

interface CardsProps {
	name: string;
	qualification: string[];
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
	let displayAreaOfStudy = areaOfStudy.substring(0, 75);

	return (
		<div className="faculty-item">
			<div className="faculty-item__image">
				<img
					src={image}
					alt={name}
					loading="lazy"
					width="343"
					height="416"
				/>
			</div>

			<div className="faculty-item__info">
				<h3>{salutation.toLowerCase() + " " + name.toLowerCase()}</h3>

				<div>
					{qualification.map((item) => {
						return (
							<p key={item + name} title={item}>
								{item.toLowerCase()}
							</p>
						);
					})}
				</div>

				<p title={areaOfStudy}>
					{displayAreaOfStudy.toLowerCase() +
						`${displayAreaOfStudy === areaOfStudy ? "" : "..."}`}
				</p>

				<p title={departmentName}>{departmentName.toLowerCase()}</p>
			</div>
		</div>
	);
}
