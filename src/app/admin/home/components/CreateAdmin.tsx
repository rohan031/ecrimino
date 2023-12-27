"use client";

import React, { useState } from "react";
import { createAdmin } from "@/firebase/auth/auth";

export default function CreateAdmin() {
	const [email, setEmail] = useState("");

	const handleCreateAdmin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createAdmin({ email })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<form onSubmit={handleCreateAdmin}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<button type="submit">Create Admin</button>
			</form>
		</div>
	);
}
