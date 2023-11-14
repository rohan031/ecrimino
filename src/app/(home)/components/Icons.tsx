"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IconsProps {
	icon: IconDefinition;
}

export default function Icons({ icon }: IconsProps) {
	return <FontAwesomeIcon icon={icon} />;
}
