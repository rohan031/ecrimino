"use client";

import React, { useState } from "react";
import {
	signIn,
	resendEmailVerification,
	getUser,
	signoutUser,
	addAdminRole,
} from "@/firebase/auth/auth";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();
	const [email, setEmail] = useState("rohanverma031@gmail.com");
	const [password, setPassword] = useState("R1O2H3A4N5:%%");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// console.log(getUser());

		// addAdminRole({ email })
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => console.log(err.message));

		const { result, error } = await signIn(email, password);
		if (error) {
			return console.log(error);
		}

		if (result) {
			const user = result.user;

			if (!user.emailVerified) {
				await resendEmailVerification();
				alert("sent email verification mail");
			} else {
				// const users = [
				// 	{
				// 		email: "rohanverma3892@gmail.com",
				// 		name: "Rohan Verma",
				// 		course: "m2",
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
				const result = await user.getIdTokenResult();
				console.log(result);

				if (
					!result.claims.isSuperAdmin &&
					result.claims.role === "admin"
				) {
					await signoutUser();
					alert("you are not authorized to access this dashboard");
				}
			}
		}

		// const { result, error } = await signoutUser();

		// if (error) {
		// 	console.log(error);
		// } else {
		// 	console.log(result);
		// }
	};

	const handleAdminLogin = () => {
		router.push("/admin-login");
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

			<button onClick={handleAdminLogin}>Admin login</button>
		</>
	);
}
