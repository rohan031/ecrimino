import React from "react";

interface CCPSProps {
	params: {
		id: string;
	};
}

export const dynamicParams = false;

export function generateStaticParams() {
	return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function CCPS({ params }: CCPSProps) {
	return <div>{params.id}</div>;
}
