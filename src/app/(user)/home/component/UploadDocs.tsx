import React, { useState, useRef } from "react";
import { courses, courseMap } from "@/data/course";
import { ref, uploadBytesResumable } from "firebase/storage";
import { nanoid } from "nanoid";
import { addFileMetaData, storage } from "@/firebase/auth/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Loader from "@/components/Loader/Loader";
import { FirebaseError } from "firebase/app";

interface UploadDocsProps {
	uid: string;
	handleClose: () => void;
}

export default function UploadDocs({ uid, handleClose }: UploadDocsProps) {
	const [file, setFile] = useState<File | null>(null);
	const [docInfo, setDocInfo] = useState({
		name: "",
		course: "m1",
	});
	const [progress, setProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);

	const [err, setErr] = useState<string | null>(null);
	const [msg, setMsg] = useState<string | null>(null);

	const resourceFormRef = useRef<HTMLFormElement | null>(null);

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
		setIsUploading(true);
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
					setErr("Can't upload resources right now");
					setMsg(null);
					console.error(error);
					setIsUploading(false);
					setProgress(0);
				},
				async () => {
					// successfully upload the doc
					const { result, error } = await addFileMetaData(
						docInfo.name,
						resourceLocation,
						uid,
						docInfo.course
					);

					if (error) {
						let err = error as FirebaseError;
						setErr(err.message);
						setMsg(null);
						setIsUploading(false);
						setProgress(0);
						return;
					}

					setMsg("Successfully uploaded document.");
					setErr(null);
					setIsUploading(false);
					setProgress(0);

					setFile(null);
					// form reset for input type file
					resourceFormRef.current?.reset();

					// for other controlled inputs
					setDocInfo((prev) => {
						return {
							...prev,
							name: "",
							course: "m1",
						};
					});

					setTimeout(() => {
						handleModalClose();
					}, 5000);
				}
			);
		}
	};

	const handleModalClose = () => {
		setMsg(null);
		setErr(null);
		setIsUploading(false);

		setFile(null);
		setDocInfo((prev) => {
			return {
				...prev,
				name: "",
				course: "m1",
			};
		});
		setProgress(0);

		resourceFormRef.current?.reset();
		handleClose();
	};

	return (
		<>
			<div className="upload-docs">
				<div className="upload-docs__menu">
					<button onClick={handleModalClose} title="close">
						<FontAwesomeIcon icon={faXmark} />
					</button>
				</div>

				<div className="upload-docs__container">
					<h2 className="upload-docs__container-heading">
						Upload Resources
					</h2>

					<div className="upload-docs__container-form">
						<form onSubmit={handleFileUpload} ref={resourceFormRef}>
							<div>
								<label htmlFor="file-name">File Name</label>
								<input
									type="text"
									required
									name="name"
									placeholder="File Name..."
									onChange={handleChange}
									id="file-name"
									disabled={isUploading}
									value={docInfo.name}
								/>
							</div>

							<div>
								<label htmlFor="course">Course</label>
								<select
									id="course"
									value={docInfo.course}
									onChange={handleChange}
									required
									name="course"
									disabled={isUploading}
								>
									{courses.map((course) => {
										return (
											<option
												key={course.id}
												value={course.id}
											>
												{course.name}
											</option>
										);
									})}
								</select>
							</div>

							<div>
								<label htmlFor="file">Select Document</label>

								<div>
									<input
										id="file"
										type="file"
										accept=".pdf"
										onChange={handleFileChange}
										required
										disabled={isUploading}
									/>
									{progress > 0 &&
										(progress < 100 ? (
											<progress
												value={progress}
												max="100"
											/>
										) : (
											<p className="upload message">
												Uploaded
											</p>
										))}
								</div>
							</div>

							<div className="status">
								{err && <p className="error">{err}</p>}
								{msg && <p className="message">{msg}</p>}
							</div>

							<div>
								<button disabled={!file || isUploading}>
									{isUploading ? (
										<Loader
											style={{
												paddingBlock: "0.8em",
												paddingInline: "1.4em",
												scale: "0.4",
											}}
										/>
									) : (
										"Upload"
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
