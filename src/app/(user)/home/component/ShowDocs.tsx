import React, { useRef, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage, deleteResource } from "@/firebase/auth/auth";

import Pdf from "@/../public/pdf.png";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";
import { FirebaseError } from "firebase/app";

interface ShowDocsProps {
	course: string;
	facultyId: string;
	fileLocation: string;
	fileName: string;
	docId?: string;
	handleDeleteUi?: (index: number) => void;
	index?: number;
}

export default function ShowDocs({
	course,
	facultyId,
	fileLocation,
	fileName,
	docId,
	handleDeleteUi,
	index,
}: ShowDocsProps) {
	const confirmDeleteRef = useRef<HTMLDialogElement | null>(null);
	const [deleting, setDeleting] = useState(false);
	const [err, setErr] = useState<string | null>(null);

	const handleClick = async () => {
		let resourceRef = ref(storage, fileLocation);
		let url = await getDownloadURL(resourceRef);

		window.open(url, "_blank");
	};

	const handleDelete = () => {
		confirmDeleteRef.current?.showModal();
	};

	const handleCancelDelete = () => {
		confirmDeleteRef.current?.close();
	};

	const handleConfirmDelete = async () => {
		setDeleting(true);
		const { result, error } = await deleteResource(docId, fileLocation);

		if (error) {
			let err = error as FirebaseError;

			setErr(err.message);
			setDeleting(false);
			return;
		}

		if (index && handleDeleteUi) {
			handleDeleteUi(index);
			setErr(null);
			setDeleting(false);
			confirmDeleteRef.current?.close();
		}
	};

	return (
		<div className="docs-item" title={fileName}>
			<Image src={Pdf} alt="" />
			<p className="link" onClick={handleClick}>
				{fileName}
			</p>
			<p>{course}</p>

			{docId && <button onClick={handleDelete}>Delete</button>}

			<>
				<dialog ref={confirmDeleteRef}>
					<h3>Confirm Delete</h3>

					<p style={{ marginBlock: "0.5em" }}>
						Do you really want to delete the document?
					</p>

					<div className="confirm-delete-buttons">
						<button
							disabled={deleting}
							onClick={handleConfirmDelete}
						>
							{deleting ? (
								<Loader
									style={{
										paddingBlock: "0.8em",
										paddingInline: "1.4em",
										scale: "0.4",
									}}
								/>
							) : (
								"Delete"
							)}
						</button>

						<button
							disabled={deleting}
							onClick={handleCancelDelete}
						>
							Cancel
						</button>
					</div>

					<p className="error">{err}</p>
				</dialog>
			</>
		</div>
	);
}
