"use client";

import React, { useState } from "react";
import { createAdmin } from "@/firebase/auth/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Loader from "@/components/Loader/Loader";
import { FirebaseError } from "firebase/app";

interface CreateAdminProps {
	handleClose: () => void;
}

export default function CreateAdmin({ handleClose }: CreateAdminProps) {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState<string | null>(null);
	const [msg, setMsg] = useState<string | null>(null);

	const handleCreateAdmin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		createAdmin({ email })
			.then((res) => {
				// console.log(res);
				setMsg("Successfully created admin");
				setErr(null);

				setTimeout(() => {
					handleModalClose();
				}, 5000);
			})
			.catch((err: FirebaseError) => {
				// console.error(err);
				setErr(err.message);
				setMsg(null);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleModalClose = () => {
		setEmail("");
		setErr(null);
		setMsg(null);

		handleClose();
	};

	return (
		<div className="create-admin-container">
			<div className="create-admin__menu">
				<button onClick={handleModalClose} title="close">
					<FontAwesomeIcon icon={faXmark} />
				</button>
			</div>

			<h3>Create Admin</h3>

			<form onSubmit={handleCreateAdmin}>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Email..."
					/>
				</div>

				<div>
					{err && <p className="error">{err}</p>}
					{msg && <p className="message">{msg}</p>}
				</div>

				<div>
					<button type="submit" disabled={loading}>
						{loading ? (
							<Loader
								style={{
									paddingBlock: "0.8em",
									paddingInline: "3em",
									scale: "0.4",
								}}
							/>
						) : (
							"Create Admin"
						)}
					</button>
				</div>
			</form>
		</div>
	);
}
