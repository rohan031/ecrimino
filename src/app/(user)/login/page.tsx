"use client";

import React, { useState, useEffect } from "react";
import {
	signIn,
	resendEmailVerification,
	getUser,
	signoutUser,
	auth,
} from "@/firebase/auth/auth";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";

export default function Page() {
	// const [email, setEmail] = useState("rohanverma031@gmail.com");
	// const [password, setPassword] = useState("R1O2H3A4N5:%%");

	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(true);
	const [isSigningIn, setIsSigningIn] = useState(false);

	useEffect(() => {
		const authstate = onAuthStateChanged(auth, async (user) => {
			if (user) {
				if (!user.emailVerified) {
					await resendEmailVerification();
					alert("sent email verification mail");
					return;
				}

				const result = await user?.getIdTokenResult();

				if (
					result?.claims.isSuperAdmin ||
					result?.claims.role === "admin"
				) {
					router.push("/admin/login");
					return;
				}

				router.push("/home");
			} else {
				setLoading(false);
			}
		});

		return () => authstate();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// alert("Page under construction");
		setIsSigningIn(true);

		const { result, error } = await signIn(email, password);
		if (error) {
			console.error(error);
			alert(error);
			setIsSigningIn(false);
			return;
		}

		if (result) {
			const user = result.user;

			if (!user.emailVerified) {
				await resendEmailVerification();
				alert("sent email verification mail");
				setIsSigningIn(false);
				return;
			}

			const details = await user.getIdTokenResult();

			if (
				details.claims.isSuperAdmin ||
				details.claims.role === "admin"
			) {
				await signoutUser();
				alert("you are not authorized to access this dashboard");
				setIsSigningIn(false);
				return;
			}
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

						<h2>User Login</h2>
					</div>

					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={isSigningIn}
								required
								placeholder="Email..."
							/>
						</div>

						<div>
							<label htmlFor="password">Passwrod</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={isSigningIn}
								required
								placeholder="Password..."
							/>
						</div>

						<div>
							<button type="submit" disabled={isSigningIn}>
								{isSigningIn ? (
									<Loader
										style={{
											margin: "0.8em 1.2em",
											scale: "0.5",
										}}
									/>
								) : (
									"Login"
								)}
							</button>
						</div>
					</form>

					<div className="form-links">
						<Link href="">Forgot Password?</Link>

						<Link href="/admin/login">Admin login</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
