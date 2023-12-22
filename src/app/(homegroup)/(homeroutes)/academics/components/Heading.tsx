import React from "react";

interface HeadingProps {
	heading: string;
	classname: string;
}

export default function Heading({ heading, classname }: HeadingProps) {
	return (
		<div className={`main-heading ${classname}`}>
			<h1>{heading}</h1>
		</div>
	);
}
