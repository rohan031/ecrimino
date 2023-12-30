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

export default function Page() {
	// const [email, setEmail] = useState("rohanverma031@gmail.com");
	// const [password, setPassword] = useState("R1O2H3A4N5:%%");

    const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false)

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
		alert("Page under construction");
		// console.log(getUser());

		// addAdminRole({ email })
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => console.log(err.message));

		// const { result, error } = await signIn(email, password);
		// if (error) {
		// 	return console.log(error);
		// }

		// if (result) {
		// 	const user = result.user;

		// 	if (!user.emailVerified) {
		// 		await resendEmailVerification();
		// 		alert("sent email verification mail");
		// 	} else {
		// 		// const users = [
		// 		// 	{
		// 		// 		email: "rohanverma3892@gmail.com",
		// 		// 		name: "Rohan Verma",
		// 		// 		course: "m2",
		// 		// 	},
		// 		// ];
		// 		// let isFaculty = false;
		// 		// addAdminRole({ users, isFaculty })
		// 		// 	.then((res) => {
		// 		// 		console.log(res);
		// 		// 	})
		// 		// 	.catch((err: Error) => {
		// 		// 		console.log(err);
		// 		// 	});
		// 		const result = await user.getIdTokenResult();
		// 		console.log(result);

		// 		if (
		// 			!result.claims.isSuperAdmin &&
		// 			result.claims.role === "admin"
		// 		) {
		// 			await signoutUser();
		// 			alert("you are not authorized to access this dashboard");
		// 		}
		// 	}
		// }

		// // const { result, error } = await signoutUser();

		// // if (error) {
		// // 	console.log(error);
		// // } else {
		// // 	console.log(result);
		// // }
	};

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

						<Link href="/admin/login">Admin login</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
