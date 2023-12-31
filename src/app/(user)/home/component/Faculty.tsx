"use client";

import React, { useState } from "react";
import { signoutUser, getDocsById } from "@/firebase/auth/auth";
import { User } from "firebase/auth";
import Loader from "@/components/Loader/Loader";
import UploadDocs from "./UploadDocs";
import ShowDocs from "./ShowDocs";
import { DocumentData } from "firebase/firestore";

interface Docs {
	docData: DocumentData[];
	docId: string[];
}

export default function Faculty({ user }: { user: User }) {
	const [uploadDoc, setUploadDoc] = useState(false);

	const [docs, setDocs] = useState<Docs>();

	const handleSignout = async () => {
		await signoutUser();
	};

	const getDocs = async () => {
		const { result, error } = await getDocsById(user.uid);

		if (error) {
			console.error(error);
			alert("can't get docs");
			return;
		}

		if (!result) {
			console.log("no docs for this user");
			return;
		}

		console.log(result);
		setDocs(result);
	};

	return (
		<>
			<div>
				<p>{user.displayName}</p>
				<p>{user.email}</p>
				<p>{user.uid}</p>
				<p>Faculty</p>
			</div>

			<button onClick={() => setUploadDoc(true)}>Upload document</button>

			{uploadDoc && <UploadDocs uid={user.uid} />}

			<button onClick={handleSignout}>Sign Out</button>
			{/* handle page shown */}

			<div>
				<button onClick={getDocs}>Show My docs</button>

				{docs?.docData &&
					docs.docData.map((doc, index) => {
						return (
							<ShowDocs
								key={docs.docId[index]}
								course={doc.course}
								facultyId={doc.facultyId}
								fileLocation={doc.fileLocation}
								fileName={doc.fileName}
								docId={docs.docId[index]}
							/>
						);
					})}
			</div>
		</>
	);
}
