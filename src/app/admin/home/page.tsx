"use client";

import React, { useState, useEffect } from "react";
import { getUser, signoutUser, auth } from "@/firebase/auth/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import CreateFaculty from "./components/CreateFaculty";
import CreateStudent from "./components/CreateStudent";
import DeleteUser from "./components/DeleteUser";
import Loader from "@/components/Loader/Loader";
import CreateAdmin from "./components/CreateAdmin";

export default function Page() {
	const [page, setPage] = useState(1);
	const user = getUser();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [superAdmin, setSuperAdmin] = useState(false);

	useEffect(() => {
		const authstate = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const result = await user?.getIdTokenResult();
				setLoading(false);

				if (result?.claims.isSuperAdmin) {
					setSuperAdmin(true);
				}

				if (
					!result?.claims.isSuperAdmin &&
					result?.claims.role !== "admin"
				) {
					await signoutUser();
					router.push("/admin/login");
				}
			} else {
				router.push("/admin/login");
				setLoading(false);
			}
		});

		return () => authstate();
	}, []);

	if (loading || !user) {
		return (
			<Loader
				style={{
					width: "100vw",
					height: "100vh",
					backgroundColor: "#333",
				}}
			/>
		);
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
			case 4:
				return <CreateAdmin />;
		}
	};

	return (
		<>
			<button onClick={() => handlePage(1)}>Create Faculty</button>
			<button onClick={() => handlePage(2)}>Create Student</button>
			<button onClick={() => handlePage(3)}>Delete user</button>
			<button onClick={() => handlePage(4)}>Create Admin</button>

			{/* handle page shown */}
			<div>{component()}</div>
		</>
	);
}
