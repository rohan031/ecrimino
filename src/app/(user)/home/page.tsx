"use client";

import React, { useState, useEffect } from "react";
import { getUser, auth } from "@/firebase/auth/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import Faculty from "./component/Faculty";
import Student from "./component/Student";

export default function Page() {
	const user = getUser();
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	const [faculty, setFaculty] = useState(false);

	useEffect(() => {
		const authstate = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const result = await user?.getIdTokenResult();

				if (
					result?.claims.isSuperAdmin ||
					result?.claims.role === "admin"
				) {
					router.push("/admin/login");
					return;
				}

				if (result?.claims.role == "faculty") setFaculty(true);

				setLoading(false);
			} else {
				router.push("/login");
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

	return <>{faculty ? <Faculty user={user} /> : <Student user={user} />}</>;
}
