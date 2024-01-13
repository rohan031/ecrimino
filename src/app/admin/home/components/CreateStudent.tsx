"use client";

import React, { useRef, useState } from "react";
import CSVReader from "react-csv-reader";
import ShowInfo from "./ShowInfo";
import { createUser } from "@/firebase/auth/auth";
import { courses, courseMap } from "@/data/course";
import DeleteStudent from "./delete-user/DeleteStudent";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropDownTrigger from "@/components/DropDown/DropDownTrigger";
import DropDownItem from "@/components/DropDown/DropDownItem";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "@/components/Loader/Loader";
import { FirebaseError } from "firebase/app";

type StudentDetails = {
	timeStamp?: string;
	name: string;
	email: string;
	course: string;
	startYear: string;
};

type BulkStudentInfo = StudentDetails[];

type HandleCreateStudent = (isMultiple?: boolean) => void;

export default function CreateStudent() {
	const [studentInfo, setStudentInfo] = useState<StudentDetails>({
		name: "",
		email: "",
		course: "m1",
		startYear: "",
	});

	const [bulkStudentInfo, setBulkStudentInfo] = useState<BulkStudentInfo>();

	const deleteStudentRef = useRef<HTMLDialogElement | null>(null);
	const createMultipleStudentRef = useRef<HTMLDialogElement | null>(null);

	const [creating, setCreating] = useState(false);
	const [err, setErr] = useState<string | null>(null);
	const [msg, setMsg] = useState<string | null>(null);

	const [multiCreating, setMultiCreating] = useState(false);
	const [multiErr, setMultiErr] = useState<string | null>(null);
	const [multiMsg, setMultiMsg] = useState<string | null>(null);

	const handleCreateStudent: HandleCreateStudent = (isMultiple = false) => {
		let studentDetails = [];
		if (isMultiple && bulkStudentInfo) {
			studentDetails = bulkStudentInfo;
			setMultiCreating(true);
		} else {
			studentDetails.push(studentInfo);
			setCreating(true);
		}

		if (studentDetails.length === 0) {
			return;
		}

		createUser({ users: studentDetails, isFaculty: false })
			.then((res) => {
				if (isMultiple) {
					setMultiMsg("Successfully created students");
					setMultiErr(null);
					setMultiCreating(false);
					setBulkStudentInfo(undefined);
				} else {
					setMsg("Successfully created student");
					setErr(null);
					setCreating(false);
					setStudentInfo({
						name: "",
						email: "",
						course: "m1",
						startYear: "",
					});
				}
			})
			.catch((err) => {
				let error = err as FirebaseError;

				if (isMultiple) {
					setMultiMsg(null);
					setMultiErr(error.message);
					setMultiCreating(false);
				} else {
					setMsg(null);
					setErr(error.message);
					setCreating(false);
				}
			});
	};

	const handleCSVUpload = (data: any[]) => {
		const headers = data[0];
		let len = headers.length;
		data.pop();
		console.log(data);

		let arrayOfObject: BulkStudentInfo = data
			.slice(1)
			.map((record: any) => {
				const obj: any = {};
				let isEmpty = false;

				for (let i = 0; i < len; i++) {
					let key = headers[i].toLowerCase();

					if (
						key === "name" ||
						key === "email" ||
						key === "startyear" ||
						key === "course"
					) {
						if (record[i].length === 0) isEmpty = true;

						if (key === "startyear") {
							obj["startYear"] = record[i];
						} else {
							obj[key] = record[i];
						}
					}
				}

				if (!isEmpty) return obj;
			});

		console.log(arrayOfObject);
		setBulkStudentInfo(arrayOfObject);
	};

	const handleError = (error: any) => {
		console.error("Error reading CSV file:", error);
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		let key = e.target.name;
		let value = e.target.value;

		setStudentInfo((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});
	};

	const handleDeleteStudentModalOpen = () => {
		deleteStudentRef.current?.showModal();
	};

	const handleDeleteStudentModalClose = () => {
		deleteStudentRef.current?.close();
	};

	const handleMultipleCreateStudentModalOpen = () => {
		createMultipleStudentRef.current?.showModal();
	};

	const handleMultipleCreateStudentModalClose = () => {
		setMultiMsg(null);
		setMultiErr(null);
		setMultiCreating(false);
		setBulkStudentInfo(undefined);
		createMultipleStudentRef.current?.close();
	};

	return (
		<>
			<>
				<dialog className="manage-student" ref={deleteStudentRef}>
					<DeleteStudent
						handleClose={handleDeleteStudentModalClose}
					/>
				</dialog>
			</>
			<div className="user-management">
				<div className="user-management__menu">
					<h2>Details</h2>

					<div>
						<DropdownMenu.Root>
							<DropDownTrigger>
								<button className="user-trigger">
									More
									<FontAwesomeIcon icon={faAngleDown} />
								</button>
							</DropDownTrigger>

							<DropdownMenu.Portal>
								<DropdownMenu.Content
									className="user-content"
									sideOffset={5}
								>
									<DropDownItem>
										<button
											onClick={
												handleDeleteStudentModalOpen
											}
											className="password-change"
										>
											Manage Student
										</button>
									</DropDownItem>

									<DropDownItem>
										<button
											onClick={
												handleMultipleCreateStudentModalOpen
											}
											className="password-change"
										>
											Create Multiple
										</button>
									</DropDownItem>
								</DropdownMenu.Content>
							</DropdownMenu.Portal>
						</DropdownMenu.Root>
					</div>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleCreateStudent();
					}}
				>
					<h3>Create Student</h3>

					<div>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={studentInfo.name}
							onChange={handleChange}
							required
							placeholder="Name..."
							disabled={creating}
						/>
					</div>

					<div>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={studentInfo.email}
							onChange={handleChange}
							required
							placeholder="Email..."
							disabled={creating}
						/>
					</div>

					<div>
						<label htmlFor="start-year">Start Year</label>
						<input
							id="start-year"
							name="startYear"
							value={studentInfo.startYear}
							onChange={handleChange}
							required
							placeholder="Start Year..."
							disabled={creating}
							type="number"
							min="2019"
							max={new Date().getFullYear()}
						/>
					</div>

					<div>
						<label htmlFor="course">Select course</label>
						<select
							id="course"
							value={studentInfo.course}
							onChange={handleChange}
							required
							name="course"
							disabled={creating}
						>
							{courses.map((course) => {
								return (
									<option key={course.id} value={course.id}>
										{course.name}
									</option>
								);
							})}
						</select>
					</div>

					<div>
						{err && <p className="error">{err}</p>}
						{msg && <p className="message">{msg}</p>}
					</div>

					<div>
						<button type="submit" disabled={creating}>
							{creating ? (
								<Loader
									style={{
										paddingBlock: "0.8em",
										paddingInline: "3em",
										scale: "0.4",
									}}
								/>
							) : (
								<p>Create Student</p>
							)}
						</button>
					</div>
				</form>

				<CSVReader
					onFileLoaded={handleCSVUpload}
					onError={handleError}
					inputId="csv-reader"
					inputStyle={{ color: "red" }}
				/>

				<div>
					{bulkStudentInfo?.map((info) => {
						let course = info.course;
						return (
							<ShowInfo
								key={info.email}
								name={info.name}
								email={info.email}
								startYear={info.startYear}
								course={
									courseMap[course as keyof typeof courseMap]
								}
							/>
						);
					})}

					{bulkStudentInfo?.length && bulkStudentInfo.length > 0 && (
						<button onClick={() => handleCreateStudent(true)}>
							Create all students
						</button>
					)}
				</div>
			</div>
		</>
	);
}
