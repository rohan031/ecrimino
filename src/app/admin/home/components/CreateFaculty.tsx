"use client";

import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import ShowInfo from "./ShowInfo";
import { createUser } from "@/firebase/auth/auth";

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
			})
			.catch((err) => {
				console.log(err);
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

	return (
		<div>
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
				/>

				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					value={facultyInfo.email}
					onChange={handleChange}
					placeholder="Email..."
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
	);
}
