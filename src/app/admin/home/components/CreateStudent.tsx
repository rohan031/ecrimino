"use client";

import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import ShowInfo from "./ShowInfo";
import { createUser } from "@/firebase/auth/auth";
import { courses, courseMap } from "@/data/course";

type StudentDetails = {
	timeStamp?: string;
	name: string;
	email: string;
	course: string;
	startyear: string;
};

type BulkStudentInfo = StudentDetails[];

type HandleCreateStudent = (isMultiple?: boolean) => void;

export default function CreateStudent() {
	const [studentInfo, setStudentInfo] = useState<StudentDetails>({
		name: "",
		email: "",
		course: "",
		startyear: "",
	});

	const [bulkStudentInfo, setBulkStudentInfo] = useState<BulkStudentInfo>();

	const handleCreateStudent: HandleCreateStudent = (isMultiple = false) => {
		let studentDetails = [];
		if (isMultiple && bulkStudentInfo) {
			studentDetails = bulkStudentInfo;
		} else {
			studentDetails.push(studentInfo);
		}

		if (studentDetails.length === 0) {
			console.log(studentDetails);
			return;
		}

		console.log("call to cloud function");
		console.log(studentDetails);
		createUser({ users: studentDetails, isFaculty: false })
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

						obj[key] = record[i];
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

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleCreateStudent();
				}}
			>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					name="name"
					value={studentInfo.name}
					onChange={handleChange}
					required
					placeholder="Name..."
				/>

				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					value={studentInfo.email}
					onChange={handleChange}
					required
					placeholder="Email..."
				/>

				<label htmlFor="start-year">Start Year</label>
				<input
					type="string"
					id="start-year"
					name="startyear"
					value={studentInfo.startyear}
					onChange={handleChange}
					required
					placeholder="Start Year..."
				/>

				<label htmlFor="course">Select course</label>
				<select
					id="course"
					value={studentInfo.course}
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

				<button type="submit">Create student</button>
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
							startYear={info.startyear}
							course={courseMap[course as keyof typeof courseMap]}
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
	);
}
