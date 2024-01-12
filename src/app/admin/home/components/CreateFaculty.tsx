"use client";

import React, { useState, useRef } from "react";
import CSVReader from "react-csv-reader";
import ShowInfo from "./ShowInfo";
import { createUser } from "@/firebase/auth/auth";
import DeleteFaculty from "./delete-user/DeleteFaculty";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropDownTrigger from "@/components/DropDown/DropDownTrigger";
import DropDownItem from "@/components/DropDown/DropDownItem";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FacultyDetails = {
	timeStamp?: string;
	name: string;
	email: string;
};

type BulkFacultyInfo = FacultyDetails[];

type HandleCreateFaculty = (isMultiple?: boolean) => void;

export default function CreateFaculty() {
	const [facultyInfo, setFacultyInfo] = useState<FacultyDetails>({
		name: "",
		email: "",
	});

	const [bulkFacultyInfo, setBulkFacultyInfo] = useState<BulkFacultyInfo>();

	const deleteFacultyRef = useRef<HTMLDialogElement | null>(null);

	const handleCreateFaculty: HandleCreateFaculty = (isMultiple = false) => {
		let facultyDetails = [];
		if (isMultiple && bulkFacultyInfo) {
			facultyDetails = bulkFacultyInfo;
		} else {
			facultyDetails.push(facultyInfo);
		}

		console.log("call to cloud function");
		console.log(facultyDetails);
		createUser({ users: facultyDetails, isFaculty: true })
			.then((res) => {
				console.log(res);
				alert("successfully created faculty");
				setFacultyInfo({ name: "", email: "" });
				setBulkFacultyInfo(undefined);
			})
			.catch((err) => {
				console.error(err);
				alert("can't create faculty");
			});
	};

	const handleCSVUpload = (data: any[]) => {
		const headers = data[0];
		let len = headers.length;
		data.pop();
		console.log(data);

		let arrayOfObject: BulkFacultyInfo = data
			.slice(1)
			.map((record: any) => {
				const obj: any = {};
				for (let i = 0; i < len; i++) {
					let key = headers[i].toLowerCase();

					if (key === "name" || key === "email") obj[key] = record[i];
				}

				return obj;
			});

		console.log(arrayOfObject);
		setBulkFacultyInfo(arrayOfObject);
	};

	const handleError = (error: any) => {
		console.error("Error reading CSV file:", error);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let key = e.target.name;
		let value = e.target.value;

		setFacultyInfo((prev) => {
			return {
				...prev,
				[key]: value,
			};
		});
	};

	const handleDeleteFacultyModalOpen = () => {
		deleteFacultyRef.current?.showModal();
	};

	const handleDeleteFacultyModalClose = () => {
		deleteFacultyRef.current?.close();
	};

	return (
		<>
			<>
				<dialog></dialog>
			</>

			<>
				<dialog ref={deleteFacultyRef}>
					<DeleteFaculty
						handleClose={handleDeleteFacultyModalClose}
					/>
				</dialog>
			</>

			<div className="faculty-management">
				<div className="faculty-management__menu">
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
												handleDeleteFacultyModalOpen
											}
											className="password-change"
										>
											Delete Faculty
										</button>
									</DropDownItem>

									<DropDownItem>
										<button
											// onClick={handleChangePassword}
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
						handleCreateFaculty();
					}}
				>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						value={facultyInfo.name}
						onChange={handleChange}
						placeholder="Name..."
						required
					/>

					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={facultyInfo.email}
						onChange={handleChange}
						placeholder="Email..."
						required
					/>

					<button type="submit">Create Faculty</button>
				</form>

				<CSVReader
					onFileLoaded={handleCSVUpload}
					onError={handleError}
					inputId="csv-reader"
					inputStyle={{ color: "red" }}
				/>

				<div>
					{bulkFacultyInfo?.map((info) => {
						return (
							<ShowInfo
								key={info.email}
								name={info.name}
								email={info.email}
							/>
						);
					})}

					{bulkFacultyInfo?.length && bulkFacultyInfo.length > 0 && (
						<button onClick={() => handleCreateFaculty(true)}>
							Create all faculties
						</button>
					)}
				</div>
			</div>
		</>
	);
}
