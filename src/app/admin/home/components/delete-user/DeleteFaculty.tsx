import React, { useRef, useState } from "react";
import { getFacultyByEmail, deleteUsers } from "@/firebase/auth/auth";
import { DocumentData } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FirebaseError } from "firebase/app";
import Loader from "@/components/Loader/Loader";

interface Faculty {
	userData: DocumentData;
	userDocId: string;
}

interface DeleteFacultyProps {
	handleClose: () => void;
}

export default function DeleteFaculty({ handleClose }: DeleteFacultyProps) {
	const [email, setEmail] = useState("");
	const [faculty, setFaculty] = useState<Faculty | null>(null);
	const [err, setErr] = useState<string | null>(null);
	const [msg, setMsg] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const [deleting, setDeleting] = useState(false);
	const [deleteErr, setDeleteErr] = useState<string | null>(null);

	const confirmDeleteRef = useRef<HTMLDialogElement | null>(null);

	const findFaculty = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (email.length === 0) return;
		setLoading(true);

		const { result, error } = await getFacultyByEmail(email);

		if (error) {
			let err = error as FirebaseError;
			setErr(err.message);
			setMsg(null);
			setLoading(false);
			return;
		}

		if (!result) {
			setErr("No faculty found with that email");
			setMsg(null);
			setLoading(false);
			return;
		}

		setFaculty(result);
		setMsg(null);
		setErr(null);
		setLoading(false);
	};

	const deleteFaculty = async (id: string) => {
		deleteUsers({ users: [id], isFaculty: true })
			.then((res) => {
				setFaculty(null);
				setEmail("");
				setMsg("Successfully deleted the faculty");
				handleCancelDelete();
			})
			.catch((err) => {
				console.error(err);
				let error = err as FirebaseError;
				setDeleteErr(error.message);
				setDeleting(false);
			});
	};

	const handleModalClose = () => {
		setEmail("");
		setFaculty(null);
		setErr(null);
		setMsg(null);
		handleClose();
	};

	const handleDelete = () => {
		confirmDeleteRef.current?.showModal();
	};

	const handleCancelDelete = () => {
		setDeleting(false);
		setDeleteErr(null);

		confirmDeleteRef.current?.close();
	};

	const handleConfirmDelete = () => {
		if (!faculty) {
			setDeleteErr("Invalid faculty details");
			return;
		}

		setDeleting(true);
		deleteFaculty(faculty.userDocId);
	};

	return (
		<>
			<>
				<dialog ref={confirmDeleteRef}>
					<h3>Confirm Delete</h3>

					<p style={{ marginBlock: "0.5em" }}>
						Do you really want to delete the faculty?
					</p>

					<div className="confirm-delete-buttons">
						<button
							disabled={deleting}
							onClick={handleConfirmDelete}
						>
							{deleting ? (
								<Loader
									style={{
										paddingBlock: "0.8em",
										paddingInline: "1.4em",
										scale: "0.4",
									}}
								/>
							) : (
								"Delete"
							)}
						</button>

						<button
							disabled={deleting}
							onClick={handleCancelDelete}
						>
							Cancel
						</button>
					</div>

					{deleteErr && <p className="error">{deleteErr}</p>}
				</dialog>
			</>

			<div className="delete-user">
				<div className="modal-menu">
					<button onClick={handleModalClose} title="close">
						<FontAwesomeIcon icon={faXmark} />
					</button>
				</div>

				<form onSubmit={findFaculty}>
					<div>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder="Faculty email..."
							disabled={loading}
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
										paddingInline: "2em",
										scale: "0.4",
									}}
								/>
							) : (
								<p>Search</p>
							)}
						</button>
					</div>
				</form>

				{faculty && (
					<div className="user-item__parent">
						<div className="user-item">
							<p>{faculty.userData.name}</p>
							<p>{faculty.userData.email}</p>

							<button onClick={handleDelete}>Delete</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
