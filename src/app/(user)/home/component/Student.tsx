import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState, useCallback, useRef } from "react";

import { getDocsByCourse, signoutUser } from "@/firebase/auth/auth";
import ShowDocs from "./ShowDocs";
import { User } from "firebase/auth";
import Ecrimino from "@/../public/logo.png";

import { courseMap } from "@/data/course";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropDownTrigger from "@/components/DropDown/DropDownTrigger";
import DropDownItem from "@/components/DropDown/DropDownItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import ChangePassword from "@/components/Modals/ChangePassword";

interface Docs {
	docData: DocumentData[];
}

export default function Student({ user }: { user: User }) {
	const [docs, setDocs] = useState<Docs>();
	const [course, setCourse] = useState<string>();
	const changePasswordRef = useRef<HTMLDialogElement | null>(null);

	const getCourse = useCallback(async () => {
		const usertoken = await user?.getIdTokenResult();

		const course: string = usertoken.claims.course as string;

		setCourse(course);

		const { result, error } = await getDocsByCourse(course);

		if (error) {
			alert("can't fetch your resources");
			console.error(error);
			return;
		}

		if (!result) {
			alert("no resources for your course");
			return;
		}

		setDocs(result);
	}, [user]);

	useEffect(() => {
		getCourse();
	}, []);

	const handleSignout = async () => {
		await signoutUser();
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
											{user.email}
										</p>
									</DropDownItem>

									<DropDownItem>
										{course && (
											<p className="user-item">
												{
													courseMap[
														course as keyof typeof courseMap
													]
												}
											</p>
										)}
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

			<div className="student-docs">
				<div className="container">
					<div className="docs-container">
						{!docs && (
							<p className="no-docs">
								No resources for your course has been uploaded.
								Check again later for any updated resource.
							</p>
						)}

						{docs?.docData && (
							<div className="resources-container">
								{docs.docData.map((doc) => {
									return (
										<ShowDocs
											key={doc.fileLocation}
											course={doc.course}
											facultyId={doc.facultyId}
											fileLocation={doc.fileLocation}
											fileName={doc.fileName}
										/>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
