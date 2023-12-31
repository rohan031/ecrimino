import React, { useState } from "react";
import { courses, courseMap } from "@/data/course";
import { ref, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";
import { addFileMetaData, storage } from "@/firebase/auth/auth";

export default function UploadDocs({ uid }: { uid: string }) {
	const [file, setFile] = useState<File | null>(null);
	const [docInfo, setDocInfo] = useState({
		name: "",
		course: "m1",
	});
	const [progress, setProgress] = useState(0);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		let key = e.target.name;
		let value = e.target.value;

		setDocInfo((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});
	};

	const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let randomid = nanoid();

		if (file) {
			const resourceLocation = `resources/${uid}/${randomid}.pdf`;
			const resourceRef = ref(storage, resourceLocation);

			const uploadTask = uploadBytesResumable(resourceRef, file);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// get progress
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setProgress(progress);
				},
				(error) => {
					// error uploading doc
					alert("doc didn't upload");
					console.error(error);
				},
				async () => {
					// successfully upload the doc
					await addFileMetaData(
						docInfo.name,
						resourceLocation,
						uid,
						docInfo.course
					);
				}
			);
		}
	};

	return (
		<div>
			<form onSubmit={handleFileUpload}>
				<input
					type="file"
					accept=".pdf"
					onChange={handleFileChange}
					required
				/>
				{progress > 0 && <progress value={progress} max="100" />}

				<input
					type="text"
					required
					name="name"
					placeholder="File Name..."
					onChange={handleChange}
				/>

				<select
					id="course"
					value={docInfo.course}
					onChange={handleChange}
					required
					name="course"
				>
					{courses.map((course) => {
						return (
							<option key={course.id} value={course.id}>
								{course.name}
							</option>
						);
					})}
				</select>

				<button disabled={!file}>Upload</button>
			</form>
		</div>
	);
}
