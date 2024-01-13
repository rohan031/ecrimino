"use client";

import React, { useState, useRef } from "react";
import CSVReader from "react-csv-reader";
import ShowInfo from "./ShowInfo";
import { createUser, getAllFaculty } from "@/firebase/auth/auth";
import DeleteFaculty from "./delete-user/DeleteFaculty";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropDownTrigger from "@/components/DropDown/DropDownTrigger";
import DropDownItem from "@/components/DropDown/DropDownItem";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "@/components/Loader/Loader";
import { FirebaseError } from "firebase/app";
import { DocumentData } from "firebase/firestore";

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
	const createMultipleFacultyRef = useRef<HTMLDialogElement | null>(null);

	const [creating, setCreating] = useState(false);
	const [err, setErr] = useState<string | null>(null);
	const [msg, setMsg] = useState<string | null>(null);

	const [multiCreating, setMultiCreating] = useState(false);
	const [multiErr, setMultiErr] = useState<string | null>(null);
	const [multiMsg, setMultiMsg] = useState<string | null>(null);

	const [allFaculty, setAllFaculty] = useState<DocumentData[] | null>(null);
	const [allFacultyLoading, setAllFacultyLoading] = useState(false);
	const [allFacultyErr, setAllFacultyErr] = useState<string | null>(null);

	const getFaculties = async () => {
		setAllFacultyLoading(true);

		const { result, error } = await getAllFaculty();

		if (error) {
			let err = error as FirebaseError;
			setAllFacultyErr(err.message);
			setAllFacultyLoading(false);
			setAllFaculty(null);
			return;
		}

		if (!result) {
			setAllFacultyErr(
				"No faculty added yet. Add a faculty to view its detail."
			);
			setAllFacultyLoading(false);
			setAllFaculty(null);
			return;
		}

		setAllFacultyLoading(false);
		setAllFaculty(result);
		setAllFacultyErr(null);
	};

	const handleCreateFaculty: HandleCreateFaculty = (isMultiple = false) => {
		let facultyDetails = [];

		if (isMultiple && bulkFacultyInfo) {
			facultyDetails = bulkFacultyInfo;
			setMultiCreating(true);
		} else {
			facultyDetails.push(facultyInfo);
			setCreating(true);
		}

		createUser({ users: facultyDetails, isFaculty: true })
			.then((res) => {
				if (isMultiple) {
					setMultiMsg("Successfully created faculties");
					setMultiErr(null);
					setMultiCreating(false);
					setBulkFacultyInfo(undefined);
				} else {
					setMsg("Successfully created faculty");
					setErr(null);
					setCreating(false);
					setFacultyInfo({ name: "", email: "" });
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

		let valid = false;

		let name = false;
		let email = false;

		let arrayOfObject: BulkFacultyInfo = data
			.slice(1)
			.map((record: any) => {
				const obj: any = {};
				for (let i = 0; i < len; i++) {
					let key = headers[i].toLowerCase();

					if (key === "name" || key === "email") obj[key] = record[i];

					if (key === "name") name = true;
					if (key === "email") email = true;
				}

				return obj;
			});

		valid = name && email;

		if (valid) setBulkFacultyInfo(arrayOfObject);
		else {
			// wrong csv
			setMultiErr(
				"Invalid Details in the .csv file. Please check the documentation for the corrent file format"
			);
			setMultiMsg(null);
		}
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

	const handleMultipleCreateFacultyModalOpen = () => {
		createMultipleFacultyRef.current?.showModal();
	};

	const handleMultipleCreateFacultyModalClose = () => {
		setMultiMsg(null);
		setMultiErr(null);
		setMultiCreating(false);
		setBulkFacultyInfo(undefined);
		createMultipleFacultyRef.current?.close();
	};

	return (
		<>
			<>
				<dialog ref={createMultipleFacultyRef}>
					<div className="multiple-create-faculty">
						<h3>Create Multiple Faculty</h3>

						<CSVReader
							onFileLoaded={handleCSVUpload}
							onError={handleError}
							inputId="csv-reader"
							inputStyle={{ color: "red" }}
							label="Input .csv files "
						/>

						<div className="csv-info">
							{bulkFacultyInfo?.map((info) => {
								return (
									<ShowInfo
										key={info.email}
										name={info.name}
										email={info.email}
									/>
								);
							})}

							<div>
								{multiErr && (
									<p className="error">{multiErr}</p>
								)}

								{multiMsg && (
									<p className="message">{multiMsg}</p>
								)}
							</div>

							{bulkFacultyInfo?.length &&
								bulkFacultyInfo.length > 0 && (
									<div className="csv-info__button">
										<button
											onClick={() =>
												handleCreateFaculty(true)
											}
											disabled={multiCreating}
										>
											{multiCreating ? (
												<Loader
													style={{
														paddingBlock: "0.8em",
														paddingInline: "3em",
														scale: "0.4",
													}}
												/>
											) : (
												<p>Create all faculties</p>
											)}
										</button>
									</div>
								)}
						</div>

						<div className="cancel">
							<button
								onClick={handleMultipleCreateFacultyModalClose}
								disabled={multiCreating}
							>
								Cancel
							</button>
						</div>
					</div>
				</dialog>
			</>

			<>
				<dialog ref={deleteFacultyRef}>
					<DeleteFaculty
						handleClose={handleDeleteFacultyModalClose}
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
												handleDeleteFacultyModalOpen
											}
											className="password-change"
										>
											Manage Faculty
										</button>
									</DropDownItem>

									<DropDownItem>
										<button
											onClick={
												handleMultipleCreateFacultyModalOpen
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
						handleCreateFaculty();
					}}
				>
					<h3>Create Faculty</h3>

					<div>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={facultyInfo.name}
							onChange={handleChange}
							placeholder="Name..."
							required
							disabled={creating}
						/>
					</div>

					<div>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={facultyInfo.email}
							onChange={handleChange}
							placeholder="Email..."
							required
							disabled={creating}
						/>
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
										paddingInline: "2em",
										scale: "0.4",
									}}
								/>
							) : (
								<p>Create Faculty</p>
							)}
						</button>
					</div>
				</form>

				<div className="view-all-fac">
					<div>
						<button
							onClick={getFaculties}
							disabled={allFacultyLoading}
						>
							{allFacultyLoading ? (
								<Loader
									style={{
										paddingBlock: "0.8em",
										paddingInline: "3em",
										scale: "0.4",
									}}
								/>
							) : (
								<p>View all faculty</p>
							)}
						</button>
					</div>

					<div>
						{allFacultyErr && (
							<p className="error">{allFacultyErr}</p>
						)}
					</div>

					{allFaculty && (
						<div className="all-faculty-container">
							{allFaculty.map((fac) => {
								return (
									<div key={fac.email}>
										<p>{fac.name}</p>
										<p>{fac.email}</p>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
