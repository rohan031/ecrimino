"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IconsProps {
	icon: IconDefinition;
	link: string;
	children?: React.ReactNode;
	label?: string;
}

export default function Icons({ icon, link, children, label }: IconsProps) {
	return (
		<>
			<a href={link} target="_blank" className="icon" aria-label={label}>
				<span className="icon-image">
					<FontAwesomeIcon icon={icon} />
				</span>

				{children && <span className="icon-text">{children}</span>}
			</a>
			{/* {children && (
				<a href={link} target="_blank" className="icon-text">
					{children}
				</a>
			)} */}
		</>
	);
}
