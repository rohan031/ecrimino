import React from "react";

interface CourseProps {
	params: {
		courseId: string;
	};
}

export const dynamicParams = false;

export function generateStaticParams() {
	return [{ courseId: "1" }, { courseId: "2" }, { courseId: "3" }];
}

export default function Course({ params }: CourseProps) {
	return <div>{params.courseId}</div>;
}
