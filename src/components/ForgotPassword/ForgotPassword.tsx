import React, { useState } from "react";
import { forgotPassword } from "@/firebase/auth/auth";
import Loader from "../Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ForgotPasswordProps {
	forgotpasswordModal: React.MutableRefObject<HTMLDialogElement | null>;
}

export default function ForgotPassword({
	forgotpasswordModal,
}: ForgotPasswordProps) {
	const [email, setEmail] = useState("");
	const [err, setErr] = useState<string | null>(null);
	const [msg, setMsg] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		const { result, error } = await forgotPassword(email);

		if (error) {
			setMsg(null);
			setErr(
				"Error sending password reset mail. Please try again later."
			);
			setLoading(false);

			return;
		}

		setLoading(false);
		setErr(null);
		setMsg(
			`Successfully sent password reset mail. Please check ${email}'s inbox for password reset mail`
		);

		setTimeout(() => {
			handleClose();
		}, 10000);
	};

	const handleClose = () => {
		forgotpasswordModal.current?.close();
		setEmail("");
		setErr(null);
		setMsg(null);
	};

	return (
		<div className="forgot-password-item">
			<button onClick={handleClose} className="close">
				<FontAwesomeIcon icon={faXmark} />
			</button>
			<h2>Password Reset Mail</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<label>Enter your email to rest your password</label>
					<input
						type="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={loading}
					/>

					{err && <p className="error">{err}</p>}

					{msg && <p className="message">{msg}</p>}
				</div>

				<div>
					<button disabled={loading}>
						{loading ? (
							<Loader
								style={{
									paddingBlock: "0.8em",
									paddingInline: "6em",
									scale: "0.5",
								}}
							/>
						) : (
							"Send Password Reset Email"
						)}
					</button>
				</div>
			</form>
		</div>
	);
}
