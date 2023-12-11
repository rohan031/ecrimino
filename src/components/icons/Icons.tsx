"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IconsProps {
	icon: IconDefinition;
	link: string;
	children?: React.ReactNode;
}

export default function Icons({ icon, link, children }: IconsProps) {
	return (
		<>
			<a href={link} target="_blank" className="icon">
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
