"use client";

import React, { useState, useEffect } from "react";
import { getUser, signoutUser } from "@/firebase/auth/auth";
import { useRouter } from "next/navigation";
import CreateFaculty from "./components/CreateFaculty";
import CreateStudent from "./components/CreateStudent";
import DeleteUser from "./components/DeleteUser";

export default function Page() {
	const [page, setPage] = useState(1);
	const user = getUser();
	const router = useRouter();
	useEffect(() => {
		if (!user) {
			router.push("/admin-login");
		}

		const checkTypeOfUser = async () => {
			const result = await user?.getIdTokenResult();

			if (
				!result?.claims.isSuperAdmin &&
				result?.claims.role !== "admin"
			) {
				await signoutUser();
				router.push("/admin-login");
			}
		};

		checkTypeOfUser();
	}, []);

	if (!user) {
		return null;
	}

	const handlePage = async (p: number) => {
		// p -> 1 -> create faculty
		// p -> 2 -> create student
		// p -> 3 -> delete faculty
		// p -> 4 -> delete student X

		setPage(p);
	};

	const component = () => {
		switch (page) {
			case 1:
				return <CreateFaculty />;

			case 2:
				return <CreateStudent />;

			case 3:
				return <DeleteUser />;
		}
	};

	return (
		<>
			<button onClick={() => handlePage(1)}>Create Faculty</button>
			<button onClick={() => handlePage(2)}>Create Student</button>
			<button onClick={() => handlePage(3)}>Delete user</button>

			{/* handle page shown */}
			<div>{component()}</div>
		</>
	);
}
