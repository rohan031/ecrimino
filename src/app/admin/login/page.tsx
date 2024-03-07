"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
	signIn,
	resendEmailVerification,
	signoutUser,
	auth,
} from "@/firebase/auth/auth";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import { FirebaseError } from "firebase/app";
import ForgotPassword from "@/components/ForgotPassword/ForgotPassword";
import EmailConfirm from "@/components/Modals/EmailConfirm";

export default function Page() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(true);
	const [isSigningIn, setIsSigningIn] = useState(false);

	const [error, setError] = useState<string | null>(null);
	const forgotPasswordModalRef = useRef<HTMLDialogElement | null>(null);
	const confirmEmailRef = useRef<HTMLDialogElement | null>(null);
	const loginStateRef = useRef<boolean>(false);

	useEffect(() => {
		const authstate = onAuthStateChanged(auth, async (user) => {
			if (user) {
				if (!user.emailVerified) {
					await resendEmailVerification();
					confirmEmailRef.current?.showModal();
					setIsSigningIn(false);
					await signoutUser();
					return;
				}

				const result = await user?.getIdTokenResult();

				if (
					!result?.claims.isSuperAdmin &&
					result?.claims.role !== "admin"
				) {
					if (!loginStateRef.current) {
						router.push("/login");
						return;
					}

					await signoutUser();
					setError("You are not authorized to access this dashboard");
					setIsSigningIn(false);
					setLoading(false);
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
		setIsSigningIn(true);

		loginStateRef.current = true;
		const { result, error } = await signIn(email, password);

		if (error) {
			let err = error as FirebaseError;

			if (err.code == "auth/invalid-credential") {
				setError("Invalid email or password. Please try again.");
			} else {
				setError("Can't login right now. Please try again later.");
			}

			setIsSigningIn(false);
			return;
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

	const handleForgotPassword = () => {
		if (!forgotPasswordModalRef.current) return;

		forgotPasswordModalRef.current.showModal();
	};

	return (
		<>
			{/* dialog */}
			<>
				<dialog
					ref={forgotPasswordModalRef}
					className="forgot-password"
				>
					<ForgotPassword
						forgotpasswordModal={forgotPasswordModalRef}
					/>
				</dialog>
			</>

			<>
				<dialog ref={confirmEmailRef} className="email-confirm">
					<EmailConfirm confirmEmail={confirmEmailRef} />
				</dialog>
			</>

			<>
				<div className="login admin">
					<div className="container container-login">
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
										onChange={(e) =>
											setEmail(e.target.value)
										}
										disabled={isSigningIn}
										required
										placeholder="Email..."
									/>
								</div>

								<div>
									<label htmlFor="password">Password</label>
									<input
										type="password"
										id="password"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										disabled={isSigningIn}
										required
										placeholder="Password..."
									/>
								</div>

								<div>
									{error && <p className="error">{error}</p>}
								</div>

								<div>
									<button
										type="submit"
										disabled={isSigningIn}
									>
										{isSigningIn ? (
											<Loader
												style={{
													paddingBlock: "0.8em",
													paddingInline: "1.2em",
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
								<button onClick={handleForgotPassword}>
									Forgot Password?
								</button>

								<Link href="/login">User login</Link>
							</div>
						</div>
					</div>
				</div>
			</>
		</>
	);
}
