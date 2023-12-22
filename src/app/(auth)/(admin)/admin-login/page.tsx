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
import Link from "next/link";

export default function Page() {
	const router = useRouter();
	const [email, setEmail] = useState("rohanverma031@gmail.com");
	const [password, setPassword] = useState("R1O2H3A4N5:%%");

	// const [email, setEmail] = useState("vermarohan031@gmail.com");
	// const [password, setPassword] = useState("mKG0uU)Yt)8@q");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert("dashboard under construction");

		// const { result, error } = await signIn(email, password);
		// if (error) {
		// 	return console.log(error);
		// }

		// if (result) {
		// 	const user = result.user;

		// 	if (!user.emailVerified) {
		// 		await resendEmailVerification();
		// 		alert("sent email verification mail");
		// 		return;
		// 	}
		// 	// const users = [
		// 	// 	{
		// 	// 		email: "rohanverma3892@gmail.com",
		// 	// 		name: "Rohan Verma",
		// 	// 		course: "m2",
		// 	// 		startYear: "2019",
		// 	// 	},
		// 	// ];
		// 	// let isFaculty = false;
		// 	// addAdminRole({ users, isFaculty })
		// 	// 	.then((res) => {
		// 	// 		console.log(res);
		// 	// 	})
		// 	// 	.catch((err: Error) => {
		// 	// 		console.log(err);
		// 	// 	});
		// 	const details = await user.getIdTokenResult();
		// 	console.log(details);

		// 	if (
		// 		!details.claims.isSuperAdmin &&
		// 		details.claims.role !== "admin"
		// 	) {
		// 		console.log(getUser());
		// 		await signoutUser();
		// 		console.log(getUser());
		// 		alert("you are not authorized to access this dashboard");
		// 		return;
		// 	}

		// 	router.push("/admin-dashboard");
		// }
	};

	return (
		<div className="login">
			<div className="container">
				<div className="login-form">
					<div className="login-form__head">
						<Link href="/">
							<img src="/logo.png" alt="ecrimino" />
						</Link>

						<h2>Admin Login</h2>
					</div>

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

						<div>
							<button type="submit">Login</button>
						</div>
					</form>

					<div className="form-links">
						<Link href="">Forgot Password?</Link>

						<Link href="/login">User login</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
