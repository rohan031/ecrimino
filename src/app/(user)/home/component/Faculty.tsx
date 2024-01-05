"use client";

import React, { useState } from "react";
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

interface Docs {
	docData: DocumentData[];
	docId: string[];
}

export default function Faculty({ user }: { user: User }) {
	const [uploadDoc, setUploadDoc] = useState(false);

	const [docs, setDocs] = useState<Docs>();

	const handleSignout = async () => {
		await signoutUser();
	};

	const getDocs = async () => {
		const { result, error } = await getDocsById(user.uid);

		if (error) {
			console.error(error);
			alert("can't get docs");
			return;
		}

		if (!result) {
			console.log("no docs for this user");
			return;
		}

		console.log(result);
		setDocs(result);
	};

	return (
		<>
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
											className="user-item"
											onClick={handleSignout}
										>
											Sign Out
										</button>
									</DropDownItem>
								</DropdownMenu.Content>
							</DropdownMenu.Portal>
						</DropdownMenu.Root>
					</div>
				</div>
			</div>

			<button onClick={() => setUploadDoc(true)}>Upload document</button>

			{uploadDoc && <UploadDocs uid={user.uid} />}

			<button onClick={handleSignout}>Sign Out</button>
			{/* handle page shown */}

			<div>
				<button onClick={getDocs}>Manage my Uploaded resources</button>

				{docs?.docData &&
					docs.docData.map((doc, index) => {
						return (
							<ShowDocs
								key={docs.docId[index]}
								course={doc.course}
								facultyId={doc.facultyId}
								fileLocation={doc.fileLocation}
								fileName={doc.fileName}
								docId={docs.docId[index]}
							/>
						);
					})}
			</div>
		</>
	);
}
