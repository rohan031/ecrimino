import React, { useRef, useState } from "react";
import {
	deleteUsers,
	getStudentByEmail,
	getStudentsByFilters,
} from "@/firebase/auth/auth";
import { DocumentData } from "firebase/firestore";
import { courses, courseMap } from "@/data/course";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "@/components/Loader/Loader";
import { FirebaseError } from "firebase/app";

interface Student {
	userData: DocumentData;
	userDocId: string;
}

interface BulkStudentFilter {
	startYear?: string;
	course?: string;
}

interface BulkStudents {
	studentIds: string[];
	studentsData: DocumentData[];
}

interface DeleteStudentProps {
	handleClose: () => void;
}
export default function DeleteStudent({ handleClose }: DeleteStudentProps) {
	const [email, setEmail] = useState("");
	const [student, setStudent] = useState<Student | null>(null);
	const [bulkStudents, setBulkStudents] = useState<BulkStudents | null>(null);

	const [bulkStudentFilter, setBulkStudentFilter] =
		useState<BulkStudentFilter>({
			startYear: "",
			course: "m1",
		});

	const [showFilter, setShowFilter] = useState(false);

	const [err, setErr] = useState<string | null>(null);
	const [msg, setMsg] = useState<string | null>(null);

	const [loading, setLoading] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [deleteErr, setDeleteErr] = useState<string | null>(null);

	const confirmDeleteRef = useRef<HTMLDialogElement | null>(null);
	const studentIdRef = useRef<string | null>(null);
	const isBulkRef = useRef<boolean>(false);
	const bulkIndexRef = useRef<number | null>(null);

	const [bulkLoading, setBulkLoading] = useState(false);
	const [bulkErr, setBulkErr] = useState<string | null>(null);

	const handleFilterChange = () => {
		setShowFilter((prev) => !prev);
	};

	const findStudent = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (email.length === 0) return;
		setLoading(true);
		setShowFilter(false);
		setBulkStudents(null);

		const { result, error } = await getStudentByEmail(email);

		if (error) {
			console.log(error);
			let err = error as FirebaseError;

			setErr(err.message);
			setMsg(null);
			setLoading(false);
			return;
		}

		if (!result) {
			setErr("No student found with that email");
			setMsg(null);
			setLoading(false);
			return;
		}

		setLoading(false);
		setErr(null);
		setMsg(null);
		setStudent(result);
	};

	const deleteStudent = async (id: string) => {
		deleteUsers({ users: [id], isFaculty: false })
			.then((res) => {
				setStudent(null);
				setDeleteErr(null);
				setEmail("");
				handleUiUpdate();
				handleCancelDelete();
			})
			.catch((err) => {
				const error = err as FirebaseError;
				setDeleteErr(error.message);
			});
	};

	const handleBulkDeleteStudents = () => {
		if (!bulkStudents) return;

		if (
			bulkStudents.studentIds.length &&
			bulkStudents.studentIds.length < 1
		)
			return;

		deleteUsers({ users: bulkStudents.studentIds, isFaculty: false })
			.then((res) => {
				setBulkStudents(null);
				setDeleteErr(null);
				handleCancelDelete();
			})
			.catch((err) => {
				const error = err as FirebaseError;

				setDeleteErr(error.message);
			})
			.finally(() => {
				setDeleting(false);
			});
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		let key = e.target.name;
		let value = e.target.value;

		setBulkStudentFilter((prev) => {
			return { ...prev, [key]: value };
		});
	};

	const handleBulkStudentSearch = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		setBulkLoading(true);
		setStudent(null);

		const { error, result } = await getStudentsByFilters(
			bulkStudentFilter.startYear,
			bulkStudentFilter.course
		);

		if (error) {
			const err = error as FirebaseError;
			setBulkErr(err.message);
			setBulkLoading(false);
			setBulkStudents(null);
			return;
		}

		if (!result) {
			setBulkErr("No student found with that filter");
			setBulkLoading(false);
			setBulkStudents(null);
			return;
		}

		setBulkErr(null);
		setBulkLoading(false);
		setBulkStudents(result);
	};

	const handleModalClose = () => {
		setEmail("");
		setStudent(null);
		setBulkStudents(null);

		setBulkStudentFilter({
			startYear: "",
			course: "m1",
		});
		setErr(null);
		setMsg(null);
		setDeleteErr(null);
		studentIdRef.current = null;
		isBulkRef.current = false;
		bulkIndexRef.current = null;

		setShowFilter(false);
		setBulkErr(null);

		handleClose();
	};

	const handleConfirmDelete = () => {
		setDeleting(true);

		if (isBulkRef.current) {
			handleBulkDeleteStudents();
		} else {
			if (studentIdRef.current) {
				deleteStudent(studentIdRef.current);
			}
		}
	};

	const handleCancelDelete = () => {
		setDeleting(false);
		setDeleteErr(null);

		confirmDeleteRef.current?.close();
	};

	const handleUiUpdate = () => {
		let index = bulkIndexRef.current;
		if (typeof index !== "number") return;

		bulkIndexRef.current = null;

		setBulkStudents((prev) => {
			if (!prev) return null;

			let studentIds = prev.studentIds;
			let studentsData = prev.studentsData;

			studentIds.splice(index, 1);
			studentsData.splice(index, 1);

			return { studentIds, studentsData };
		});
	};

	const handleBulkStudentDelete = () => {
		isBulkRef.current = true;
		confirmDeleteRef.current?.showModal();
	};

	const handleStudentDelete = (id: string, index: number | null) => {
		studentIdRef.current = id;
		isBulkRef.current = false;

		if (index && typeof index === "number") {
			bulkIndexRef.current = index;
		}

		confirmDeleteRef.current?.showModal();
	};

	return (
		<>
			<>
				<dialog ref={confirmDeleteRef}>
					<h3>Confirm Delete</h3>

					<p style={{ marginBlock: "0.5em" }}>
						Do you really want to delete the student?
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

					{deleteErr && <p className="error">{deleteErr}</p>}
				</dialog>
			</>

			<div className="delete-user">
				<div className="modal-menu">
					<button onClick={handleModalClose} title="close">
						<FontAwesomeIcon icon={faXmark} />
					</button>
				</div>
				<form onSubmit={findStudent}>
					<div>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder="Student email..."
							disabled={loading}
						/>
					</div>

					<div>
						{err && <p className="error">{err}</p>}
						{msg && <p className="message">{msg}</p>}
					</div>

					<div>
						<button type="submit" disabled={loading}>
							{loading ? (
								<Loader
									style={{
										paddingBlock: "0.8em",
										paddingInline: "2em",
										scale: "0.4",
									}}
								/>
							) : (
								<p>Search</p>
							)}
						</button>
					</div>
				</form>

				{student && (
					<div className="user-item__parent">
						<div className="user-item">
							<p>{student.userData.name}</p>
							<p>{student.userData.email}</p>
							<p>{student.userData.startYear}</p>
							<p>
								{
									courseMap[
										student.userData
											.course as keyof typeof courseMap
									]
								}
							</p>

							<button
								onClick={() =>
									handleStudentDelete(student.userDocId, null)
								}
							>
								Delete
							</button>
						</div>
					</div>
				)}

				<div className="bulk-filter">
					<div className="show-filter">
						<button onClick={handleFilterChange}>
							Filter Students
						</button>
					</div>

					{showFilter && (
						<>
							<form onSubmit={handleBulkStudentSearch}>
								<div>
									<label htmlFor="start-year">
										Start year
									</label>
									<input
										type="number"
										placeholder="start year..."
										name="startYear"
										value={bulkStudentFilter.startYear}
										onChange={handleChange}
										min="2019"
										max={new Date().getFullYear()}
										required
										id="start-year"
										disabled={bulkLoading}
									/>
								</div>

								<div>
									<label htmlFor="course-filter">
										Course
									</label>
									<select
										id="course-filter"
										value={bulkStudentFilter.course}
										onChange={handleChange}
										required
										name="course"
										disabled={bulkLoading}
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
									{bulkErr && (
										<p className="error">{bulkErr}</p>
									)}
								</div>

								<div>
									<button
										type="submit"
										disabled={bulkLoading}
									>
										{bulkLoading ? (
											<Loader
												style={{
													paddingBlock: "0.8em",
													paddingInline: "2em",
													scale: "0.4",
												}}
											/>
										) : (
											<p>Search students</p>
										)}
									</button>
								</div>
							</form>

							{bulkStudents && (
								<>
									<div className="students-container">
										{bulkStudents.studentsData.map(
											(data, index) => {
												return (
													<div
														key={data.email}
														className="student-item"
													>
														<p>{data.name}</p>
														<p>{data.email}</p>
														<p>{data.startYear}</p>
														<p>
															{
																courseMap[
																	data.course as keyof typeof courseMap
																]
															}
														</p>

														<div>
															<button
																onClick={() =>
																	handleStudentDelete(
																		bulkStudents
																			.studentIds[
																			index
																		],
																		index
																	)
																}
															>
																Delete
															</button>
														</div>
													</div>
												);
											}
										)}
									</div>

									<div className="delete-all">
										<button
											onClick={handleBulkStudentDelete}
										>
											Delete All Students
										</button>
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
}
