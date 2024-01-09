"use client";

import React, { useState, useEffect, useRef } from "react";
import { getUser, signoutUser, auth } from "@/firebase/auth/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import CreateFaculty from "./components/CreateFaculty";
import CreateStudent from "./components/CreateStudent";
import Loader from "@/components/Loader/Loader";
import CreateAdmin from "./components/CreateAdmin";

import Image from "next/image";

import Ecrimino from "@/../public/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import ChangePassword from "@/components/Modals/ChangePassword";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropDownTrigger from "@/components/DropDown/DropDownTrigger";
import DropDownItem from "@/components/DropDown/DropDownItem";

export default function Page() {
	const [page, setPage] = useState(1);
	const user = getUser();
	const [name, setName] = useState<string>("Super Admin");
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [superAdmin, setSuperAdmin] = useState(false);

	const changePasswordRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		const authstate = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const result = await user?.getIdTokenResult();

				if (user.email === "rohanverma031@gmail.com") {
					setName("rohan verma");
				} else if (user.email === "hi.adityamohan@gmail.com") {
					setName("aditya mohan");
				} else if (user.email === "info@adgytec.in") {
					setName("Adgytec");
				}

				if (result?.claims.isSuperAdmin) {
					setSuperAdmin(true);
				}

				if (
					!result?.claims.isSuperAdmin &&
					result?.claims.role !== "admin"
				) {
					router.push("/login");
					return;
				}

				setLoading(false);
			} else {
				router.push("/admin/login");
			}
		});

		return () => authstate();
	}, []);

	const handleSignout = async () => {
		await signoutUser();
	};

	if (loading || !user) {
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

	const handlePage = async (p: number) => {
		// p -> 1 -> create faculty
		// p -> 2 -> create student
		// p -> 3 -> Create Admin

		setPage(p);
	};

	const component = () => {
		switch (page) {
			case 1:
				return <CreateFaculty />;

			case 2:
				return <CreateStudent />;

			case 3:
				return <CreateAdmin />;
		}
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
									{superAdmin ? name : user.displayName}
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

			<div>
				<button onClick={() => handlePage(1)}>Create Faculty</button>
				<button onClick={() => handlePage(2)}>Create Student</button>
				{superAdmin && (
					<button onClick={() => handlePage(3)}>Create Admin</button>
				)}
				<button onClick={handleSignout}>Sign Out</button>
			</div>

			{/* handle page shown */}
			<div>{component()}</div>
		</>
	);
}
