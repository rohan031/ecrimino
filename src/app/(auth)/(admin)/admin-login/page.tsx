"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
	signIn,
	resendEmailVerification,
	getUser,
	signoutUser,
	addAdminRole,
} from "@/firebase/auth/auth";

export default function Page() {
	const router = useRouter();
	const [email, setEmail] = useState("rohanverma031@gmail.com");
	const [password, setPassword] = useState("R1O2H3A4N5:%%");

	// const [email, setEmail] = useState("vermarohan031@gmail.com");
	// const [password, setPassword] = useState("mKG0uU)Yt)8@q");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { result, error } = await signIn(email, password);
		if (error) {
			return console.log(error);
		}

		if (result) {
			const user = result.user;

			if (!user.emailVerified) {
				await resendEmailVerification();
				alert("sent email verification mail");
				return;
			}
			// const users = [
			// 	{
			// 		email: "rohanverma3892@gmail.com",
			// 		name: "Rohan Verma",
			// 		course: "m2",
			// 		startYear: "2019",
			// 	},
			// ];
			// let isFaculty = false;
			// addAdminRole({ users, isFaculty })
			// 	.then((res) => {
			// 		console.log(res);
			// 	})
			// 	.catch((err: Error) => {
			// 		console.log(err);
			// 	});
			const details = await user.getIdTokenResult();
			console.log(details);

			if (
				!details.claims.isSuperAdmin &&
				details.claims.role !== "admin"
			) {
				console.log(getUser());
				await signoutUser();
				console.log(getUser());
				alert("you are not authorized to access this dashboard");
				return;
			}

			router.push("/admin-dashboard");
		}
	};

	const handleLogin = () => {
		router.push("/login");
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="password">Passwrod</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button type="submit">Login</button>
			</form>

			<button onClick={handleLogin}>User Login</button>
		</>
	);
}
