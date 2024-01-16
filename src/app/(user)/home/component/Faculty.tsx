"use client";

import React, { useState, useRef } from "react";
import { signoutUser, getDocsById } from "@/firebase/auth/auth";
import { User } from "firebase/auth";
import Loader from "@/components/Loader/Loader";
import UploadDocs from "./UploadDocs";
import ShowDocs from "./ShowDocs";
import { DocumentData } from "firebase/firestore";

import Ecrimino from "@/../public/logo.png";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropDownTrigger from "@/components/DropDown/DropDownTrigger";
import DropDownItem from "@/components/DropDown/DropDownItem";

import { FirebaseError } from "firebase/app";
import ChangePassword from "@/components/Modals/ChangePassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

interface Docs {
	docData: DocumentData[];
	docId: string[];
}

export default function Faculty({ user }: { user: User }) {
	const [docs, setDocs] = useState<Docs>();
	const uploadDocRef = useRef<HTMLDialogElement | null>(null);
	const [docsLoading, setDocsLoading] = useState(false);
	const [err, setErr] = useState<string | null>(null);
	const [msg, setMsg] = useState<string | null>(null);

	const changePasswordRef = useRef<HTMLDialogElement | null>(null);

	const handleSignout = async () => {
		await signoutUser();
	};

	const getDocs = async () => {
		setDocsLoading(true);
		const { result, error } = await getDocsById(user.uid);

		if (error) {
			let err = error as FirebaseError;

			setErr(err.message);
			setMsg(null);
			setDocsLoading(false);
			return;
		}

		if (!result) {
			setMsg("You have not uploaded any resources");
			setErr(null);
			setDocsLoading(false);
			return;
		}

		setDocsLoading(false);
		setDocs(result);
	};

	const handleOpenModal = () => {
		uploadDocRef.current?.showModal();
	};

	const handleCloseModal = () => {
		uploadDocRef.current?.close();
	};

	const handleDeleteDocs = (index: number) => {
		if (!docs) return;

		setDocs((prev) => {
			if (!prev) return;

			let docData = prev?.docData;
			let docId = prev?.docId;

			docData?.splice(index, 1);
			docId?.splice(index, 1);

			return { docData, docId };
		});
	};

	const handleChangePassword = () => {
		changePasswordRef.current?.showModal();
	};

	const handleChangePasswordClose = () => {
		changePasswordRef.current?.close();
	};

	return (
		<>
			<>
				<dialog ref={changePasswordRef}>
					<ChangePassword handleClose={handleChangePasswordClose} />
				</dialog>
			</>
			<div className="nav">
				<div className="container">
					<div className="user-nav">
						<div className="ecrimino">
							<Image
								priority={true}
								src={Ecrimino}
								alt="Ecrimino"
							/>
						</div>

						<DropdownMenu.Root>
							<DropDownTrigger>
								<button className="user-trigger">
									{user.displayName}
									<FontAwesomeIcon icon={faAngleDown} />
								</button>
							</DropDownTrigger>

							<DropdownMenu.Portal>
								<DropdownMenu.Content
									className="user-content"
									sideOffset={5}
								>
									<DropDownItem>
										<p className="user-item">
											{user.displayName}
										</p>
									</DropDownItem>

									<DropDownItem>
										<p className="user-item">
											{user.email}
										</p>
									</DropDownItem>

									<DropDownItem>
										<button
											onClick={handleChangePassword}
											className="password-change"
										>
											Change Password
										</button>
									</DropDownItem>

									<DropDownItem>
										<button
											className="user-item logout"
											onClick={handleSignout}
										>
											Log Out
										</button>
									</DropDownItem>
								</DropdownMenu.Content>
							</DropdownMenu.Portal>
						</DropdownMenu.Root>
					</div>
				</div>
			</div>

			<div className="faculty-dashboard">
				<div className="container faculty-main-container">
					<h2 className="faculty-dashboard__heading">Resources</h2>

					<div className="faculty-actions">
						<button
							onClick={handleOpenModal}
							className="faculty-actions__links"
						>
							Upload
						</button>

						<button
							onClick={getDocs}
							className="faculty-actions__button"
							disabled={docsLoading}
						>
							{docsLoading ? (
								<Loader
									style={{
										paddingBlock: "0.8em",
										paddingInline: "2em",
										scale: "0.4",
									}}
								/>
							) : (
								<p>My resources</p>
							)}
						</button>
					</div>

					{docs?.docData && (
						<div className="faculty-docs">
							{docs.docData.map((doc, index) => {
								return (
									<ShowDocs
										key={docs.docId[index]}
										course={doc.course}
										facultyId={doc.facultyId}
										fileLocation={doc.fileLocation}
										fileName={doc.fileName}
										docId={docs.docId[index]}
										index={index}
										handleDeleteUi={handleDeleteDocs}
									/>
								);
							})}
						</div>
					)}

					{!docs?.docData && (
						<div className="no-docs">
							{err && (
								<p className="error" style={{ color: "red" }}>
									{err}
								</p>
							)}
							{msg ? (
								<p className="message">{msg}</p>
							) : (
								!err && <p>Choose an option above to proceed</p>
							)}
						</div>
					)}
				</div>
			</div>

			<dialog ref={uploadDocRef}>
				<UploadDocs uid={user.uid} handleClose={handleCloseModal} />
			</dialog>

			<div className="bottom container">
				<div className="bottom-left">
					<Image
						src="/bottom/library.WebP"
						alt=""
						width="300"
						height="200"
					/>

					<a
						href="https://uclouvain.be/fr/instituts-recherche/juri/cridep/archives.html"
						target="_blank"
					>
						Library Link
					</a>
				</div>

				<div className="bottom-right">
					<Image
						src="/logo.png"
						alt="ecrimino"
						width="200"
						height="100"
					/>

					<a href="https://ecrimino.com/documents" target="_blank">
						Document Page
					</a>
				</div>
			</div>
		</>
	);
}