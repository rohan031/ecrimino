"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	signIn,
	resendEmailVerification,
	getUser,
	signoutUser,
	auth,
} from "@/firebase/auth/auth";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";

export default function Page() {
	const router = useRouter();
	// const [email, setEmail] = useState("rohanverma031@gmail.com");
	// const [password, setPassword] = useState("R1O2H3A4N5:%%");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const authstate = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setLoading(false);
				if (!user.emailVerified) {
					await resendEmailVerification();
					alert("sent email verification mail");
					return;
				}

				const result = await user?.getIdTokenResult();
				setLoading(false);

				if (
					!result?.claims.isSuperAdmin &&
					result?.claims.role !== "admin"
				) {
					await signoutUser();
					return;
				}

				router.push("/admin/home");
			} else {
				setLoading(false);
			}
		});

		return () => authstate();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// alert("dashboard under construction");

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

			const details = await user.getIdTokenResult();

			if (
				!details.claims.isSuperAdmin &&
				details.claims.role !== "admin"
			) {
				await signoutUser();
				alert("you are not authorized to access this dashboard");
				return;
			}

			router.push("/admin/home");
		}
	};

	if (loading) {
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

	return (
		<div className="login">
			<div className="container">
				<div className="login-form">
					<div className="login-form__head">
						{/* <Link href="/"> */}
						<img src="/logo.png" alt="ecrimino" />
						{/* </Link> */}

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
