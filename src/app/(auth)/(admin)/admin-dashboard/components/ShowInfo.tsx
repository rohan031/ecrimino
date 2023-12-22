import React from "react";

interface ShowInfoProps {
	name: string;
	email: string;
	startYear?: string;
	course?: string;
}

export default function ShowInfo({
	name,
	email,
	startYear,
	course,
}: ShowInfoProps) {
	return (
		<div>
			<p>{name}</p> <p>{email}</p> <p>{startYear}</p> <p>{course}</p>
		</div>
	);
}
