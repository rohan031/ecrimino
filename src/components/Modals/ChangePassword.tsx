import React, { useState } from "react";
import Loader from "../Loader/Loader";
import { changePassword } from "@/firebase/auth/auth";
import { FirebaseError } from "firebase/app";

interface ChangePasswordProps {
	handleClose: () => void;
}

export default function ChangePassword({ handleClose }: ChangePasswordProps) {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [isChanging, setIsChanging] = useState(false);
	const [msg, setMsg] = useState<string | null>(null);
	const [err, setErr] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsChanging(true);

		if (password !== confirmPassword) {
			setMsg(null);
			setErr("Both passwords should match.");
			setIsChanging(false);
			return;
		}

		await handleChangePassword(password);
	};

	const handleChangePassword = async (password: string) => {
		const { result, error } = await changePassword(password);

		if (error) {
			let err = error as FirebaseError;
			setErr(err.message);
			setMsg(null);
			setIsChanging(false);
			return;
		}

		setMsg("Successfully updated your password.");
		setErr(null);
		setIsChanging(false);

		setPassword("");
		setConfirmPassword("");

		setTimeout(() => {
			handleModalClose();
		}, 5000);
	};

	const handleModalClose = () => {
		setPassword("");
		setConfirmPassword("");

		setErr(null);
		setMsg(null);

		setIsChanging(false);

		handleClose();
	};

	return (
		<div className="change-password-container">
			<h3>Change Password</h3>

			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="new-password">New Password</label>
					<input
						type="password"
						id="new-password"
						placeholder="New Password..."
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						minLength={8}
					/>
				</div>

				<div>
					<label htmlFor="confirm-new-password">
						Confirm New Password
					</label>
					<input
						type="password"
						id="confirm-new-password"
						placeholder="Confirm New Password..."
						required
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>

					{confirmPassword.length > 0 &&
						confirmPassword !== password && (
							<p className="error">New password should match</p>
						)}
				</div>

				<div>
					{err && <p className="error">{err}</p>}
					{msg && <p className="message">{msg}</p>}
				</div>

				<div>
					<button
						type="submit"
						disabled={confirmPassword !== password || isChanging}
					>
						{isChanging ? (
							<Loader
								style={{
									paddingBlock: "0.8em",
									paddingInline: "4em",
									scale: "0.4",
								}}
							/>
						) : (
							"Change Password"
						)}
					</button>

					<button
						type="reset"
						onClick={handleClose}
						disabled={isChanging}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}
