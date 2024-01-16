"use client";

import React, { useState } from "react";
import { courseMap, courses } from "@/data/course";

type Value = "default" | "loading" | "error" | "success";

interface Status {
	value: Value;
	message?: string;
}

export default function Form() {
	const [status, setStatus] = useState<Status>({
		value: "default",
	});

	const [admissionDetails, setAdmissionDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		course: "m1",
	});

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		let key = e.target.name;
		let value = e.target.value;

		setAdmissionDetails((prev) => {
			return { ...prev, [key]: value };
		});
	};

	const capaitalizeFirstLetter = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let selectCourse =
			courseMap[admissionDetails.course as keyof typeof courseMap];

		let userDetails = { ...admissionDetails, course: selectCourse };

		fetch("/api/academics", {
			method: "POST",
			body: JSON.stringify(userDetails),
		})
			.then(async (response) => {
				if (!response.ok) {
					console.error("Error downloading DOCX:", response.status);
					return;
				}

				const blob = await response.blob();

				const link = document.createElement("a");
				link.href = window.URL.createObjectURL(blob);
				link.download = `${capaitalizeFirstLetter(
					userDetails.firstName
				)} ${capaitalizeFirstLetter(userDetails.lastName)}-${
					userDetails.course
				}-admission.docx`;

				link.click();

				window.URL.revokeObjectURL(link.href);

				setAdmissionDetails({
					firstName: "",
					lastName: "",
					email: "",
					phoneNumber: "",
					course: "m1",
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-name">
				<div className="input">
					<label htmlFor="first-name">First Name </label>
					<input
						type="text"
						name="firstName"
						id="first-name"
						// placeholder="First Name..."
						required
						value={admissionDetails.firstName}
						onChange={handleChange}
					/>
				</div>

				<div className="input">
					<label htmlFor="last-name">Last Name </label>
					<input
						type="text"
						name="lastName"
						id="last-name"
						// placeholder="Last Name..."
						required
						value={admissionDetails.lastName}
						onChange={handleChange}
					/>
				</div>
			</div>

			<div className="input">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					// placeholder="Email..."
					required
					value={admissionDetails.email}
					onChange={handleChange}
				/>
			</div>

			<div className="input">
				<label htmlFor="phone-no">Phone Number</label>
				<input
					type="number"
					name="phoneNumber"
					id="phone-no"
					// placeholder="Phone Number"
					pattern="[0-9]{10}"
					max={9999999999}
					min={1000000000}
					required
					value={admissionDetails.phoneNumber}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label htmlFor="course">Select course </label>
				<select
					id="course"
					// value={studentInfo.course}
					// onChange={handleChange}
					required
					name="course"
					value={admissionDetails.course}
					onChange={handleChange}
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

			<div className="button">
				<button type="submit">Submit</button>
			</div>
		</form>
	);
}
