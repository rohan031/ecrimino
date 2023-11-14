"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IconsProps {
	icon: IconDefinition;
	link: string;
}

export default function Icons({ icon, link }: IconsProps) {
	return (
		<a href={link} target="_blank" className="icon">
			<FontAwesomeIcon icon={icon} />
		</a>
	);
}
