import React, { useState } from "react";
import {
	deleteUsers,
	getStudentByEmail,
	getStudentsByFilters,
} from "@/firebase/auth/auth";
import { DocumentData } from "firebase/firestore";
import { courses, courseMap } from "@/data/course";

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

export default function DeleteStudent() {
	const [email, setEmail] = useState("vermarohan031@gmail.com");
	const [student, setStudent] = useState<Student>();
	const [bulkStudents, setBulkStudents] = useState<BulkStudents>();

	const [bulkStudentFilter, setBulkStudentFilter] =
		useState<BulkStudentFilter>({
			startYear: "",
			course: "m1",
		});

	const findStudent = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (email.length === 0) return;

		const { result, error } = await getStudentByEmail(email);

		if (error) {
			console.log(error);
			return;
		}

		if (!result) {
			console.log("No studnet found with that email");
			return;
		}

		console.log("found student");
		console.log(result);
		setStudent(result);
	};

	const deleteStudent = async (id: string) => {
		deleteUsers({ users: [id], isFaculty: false })
			.then((res) => {
				console.log(res);
				alert("successfully delete student");
				setStudent(undefined);
			})
			.catch((err) => {
				console.error(err);
				alert("can't delete student");
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
				console.log(res);
				alert("successfully delete students");
				setBulkStudents(undefined);
			})
			.catch((err) => {
				console.error(err);
				alert("can't delete students");
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

		const { error, result } = await getStudentsByFilters(
			bulkStudentFilter.startYear,
			bulkStudentFilter.course
		);

		if (error) {
			console.log(error);
			return;
		}

		if (!result) {
			console.log("No studnet found with that filter");
			alert("no student with that filter");
			return;
		}

		console.log("found students");
		setBulkStudents(result);
	};

	return (
		<div>
			<form onSubmit={findStudent}>
				<div>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Student email"
					/>
				</div>

				<button>Search</button>
			</form>

			{student && (
				<div>
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

					<button onClick={() => deleteStudent(student.userDocId)}>
						Delete
					</button>
				</div>
			)}

			<div>
				<form onSubmit={handleBulkStudentSearch}>
					<input
						type="text"
						placeholder="start year..."
						name="startYear"
						value={bulkStudentFilter.startYear}
						onChange={handleChange}
						required
					/>

					<select
						id="course"
						value={bulkStudentFilter.course}
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

					<button>Search Students</button>
				</form>

				{bulkStudents && (
					<>
						<div>
							{bulkStudents.studentsData.map((data, index) => {
								return (
									<div key={data.email}>
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

										<button
											onClick={() =>
												deleteStudent(
													bulkStudents.studentIds[
														index
													]
												)
											}
										>
											Delete
										</button>
									</div>
								);
							})}
						</div>

						<button onClick={handleBulkDeleteStudents}>
							Delete All Students
						</button>
					</>
				)}
			</div>
		</div>
	);
}
