import React from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage, deleteResource } from "@/firebase/auth/auth";

import Pdf from "@/../public/pdf.png";
import Image from "next/image";

interface ShowDocsProps {
	course: string;
	facultyId: string;
	fileLocation: string;
	fileName: string;
	docId?: string;
}

export default function ShowDocs({
	course,
	facultyId,
	fileLocation,
	fileName,
	docId,
}: ShowDocsProps) {
	const handleClick = async () => {
		let resourceRef = ref(storage, fileLocation);
		let url = await getDownloadURL(resourceRef);

		window.open(url, "_blank");
	};

	const handleDelete = async () => {
		if (confirm("Do you really want to delete the document?") == true)
			await deleteResource(docId, fileLocation);
	};

	return (
		<div className="docs-item" onClick={handleClick} title={fileName}>
			<Image src={Pdf} alt="" />
			<p>{fileName}</p>
			<p>{course}</p>

			{docId && <button onClick={handleDelete}>Delete</button>}
		</div>
	);
}
