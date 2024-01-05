import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";

import { getDocsByCourse } from "@/firebase/auth/auth";
import ShowDocs from "./ShowDocs";
import { User } from "firebase/auth";

import { courseMap } from "@/data/course";

interface Docs {
	docData: DocumentData[];
}

export default function Student({ user }: { user: User }) {
	const [docs, setDocs] = useState<Docs>();
	const [course, setCourse] = useState<string>();

	const getCourse = useCallback(async () => {
		const usertoken = await user?.getIdTokenResult();

		const course: string = usertoken.claims.course as string;

		setCourse(course);

		const { result, error } = await getDocsByCourse(course);

		if (error) {
			alert("can't fetch your resources");
			console.error(error);
			return;
		}

		if (!result) {
			alert("no resources for your course");
			return;
		}

		setDocs(result);
	}, [user]);

	useEffect(() => {
		getCourse();
	}, []);

	return (
		<div className="container">
			<div className="user-details">
				<p>{user.displayName}</p>
				<p>{user.email}</p>
				{course && <p>{courseMap[course as keyof typeof courseMap]}</p>}
				<p>{user.uid}</p>
				<p>Student</p>
			</div>

			<div>
				{!docs && <p>No resources for your course has been uploaded</p>}

				{docs?.docData &&
					docs.docData.map((doc) => {
						return (
							<ShowDocs
								key={doc.fileLocation}
								course={doc.course}
								facultyId={doc.facultyId}
								fileLocation={doc.fileLocation}
								fileName={doc.fileName}
							/>
						);
					})}
			</div>
		</div>
	);
}
