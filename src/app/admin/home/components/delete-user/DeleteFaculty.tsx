import React, { useState } from "react";
import { getFacultyByEmail, deleteUsers } from "@/firebase/auth/auth";
import { DocumentData } from "firebase/firestore";

interface Faculty {
	userData: DocumentData;
	userDocId: string;
}

export default function DeleteFaculty() {
	const [email, setEmail] = useState("vermarohan031@gmail.com");
	const [faculty, setFaculty] = useState<Faculty>();

	const findFaculty = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (email.length === 0) return;

		const { result, error } = await getFacultyByEmail(email);

		if (error) {
			console.log(error);
			return;
		}

		if (!result) {
			console.log("No faculty found with that email");
			return;
		}

		console.log("found faculty");
		setFaculty(result);
	};

	const deleteFaculty = async (id: string) => {
		deleteUsers({ users: [id], isFaculty: true })
			.then((res) => {
				console.log(res);
				alert("successfully delete faculty");
				setFaculty(undefined);
			})
			.catch((err) => {
				console.error(err);
				alert("can't delete faculty");
			});
	};

	return (
		<div>
			<form onSubmit={findFaculty}>
				<div>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="faculty email"
					/>
				</div>

				<button>Search</button>
			</form>

			{faculty && (
				<div>
					<p>{faculty.userData.name}</p>
					<p>{faculty.userData.email}</p>

					<button onClick={() => deleteFaculty(faculty.userDocId)}>
						Delete
					</button>
				</div>
			)}
		</div>
	);
}
