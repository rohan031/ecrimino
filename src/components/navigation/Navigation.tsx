"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface Links {
	text: string;
	link?: string;
	subLinks?: {
		text: string;
		link: string;
		newPage?: boolean;
	}[];
}

interface NavigationProps {
	data: {
		academics: Links;
		admissions: Links;
		ccps: Links;
		gallery: Links;
		aboutus: Links;
		contactus: Links;
	};
}

export default function Navigation({ data }: NavigationProps) {
	const [navOpen, setNavOpen] = useState<boolean>(false);
	const [subOpen, setSubOpen] = useState(0);
	const pathname = usePathname();
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const controlNavbar = () => {
		if (typeof window !== "undefined") {
			let scrollY = window.scrollY;
			if (scrollY > lastScrollY && scrollY > 168) {
				// if scroll down hide the navbar
				setShow(false);
			} else {
				// if scroll up show the navbar
				setShow(true);
			}

			// remember current page location to use in the next move
			setLastScrollY(scrollY);
		}
	};

	useEffect(() => {
		setNavOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", controlNavbar);

			// cleanup function
			return () => {
				window.removeEventListener("scroll", controlNavbar);
			};
		}
	}, [lastScrollY]);

	const handleChange = () => {
		setNavOpen((prev) => !prev);
	};

	let one = subOpen === 1;
	let two = subOpen === 2;
	let three = subOpen === 3;

	const handleSubOpen = (val: number) => {
		if (subOpen === val) {
			setSubOpen(0);
			return;
		}

		setSubOpen(val);
	};

	return (
		<nav className={`${!show && !navOpen && "hide"}`}>
			<div className="container nav">
				<Link href="/" className="nav-logo">
					<Image
						src="/logo.png"
						alt="Ecole de Criminology"
						width="288"
						height="62"
						// width="192"
						// height="41"
					/>
				</Link>

				<div className="nav-items">
					<>
						<input
							id="nav-toggle"
							type="checkbox"
							checked={navOpen}
							onChange={handleChange}
						/>
						<label htmlFor="nav-toggle" tabIndex={0}>
							<span></span>
							<span></span>
							<span></span>
						</label>
					</>

					<ul className="nav-items__elements">
						<li className="nav-items__elements-child" tabIndex={0}>
							<input
								type="checkbox"
								checked={one}
								onChange={() => {}}
							/>

							<div
								className="nav-hover"
								onClick={() => handleSubOpen(1)}
							>
								<span>
									{data.academics.text}
									<FontAwesomeIcon icon={faAngleDown} />
								</span>

								<ul className="nav-links__sub">
									{/* <li>
										<Link href="/academics/masters">
											{t("nav.masters")}
										</Link>
									</li>
									<li>
										<Link href="/academics/phd">
											{t("nav.phd")}
										</Link>
									</li>
									<li>
										<Link href="/academics/certifications">
											{t("nav.certifications")}
										</Link>
									</li> */}

									{data.academics.subLinks?.map((link) => {
										return (
											<li key={link.text}>
												<Link
													href={link.link}
													target={`${
														link.newPage
															? "_blank"
															: ""
													}`}
												>
													{link.text}
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						</li>
						<li className="nav-items__elements-child">
							<Link
								href={
									data.admissions.link
										? data.admissions.link
										: ""
								}
							>
								{data.admissions.text}
							</Link>
						</li>
						<li
							className="hover nav-items__elements-child"
							tabIndex={0}
						>
							<input
								type="checkbox"
								checked={two}
								onChange={() => {}}
							/>

							<div
								className="nav-hover"
								onClick={() => handleSubOpen(2)}
							>
								<span>
									{data.ccps.text}
									<FontAwesomeIcon icon={faAngleDown} />
								</span>

								<ul className="nav-links__sub">
									{data.ccps.subLinks?.map((link) => {
										return (
											<li key={link.text}>
												<Link
													href={link.link}
													target={`${
														link.newPage
															? "_blank"
															: ""
													}`}
												>
													{link.text}
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						</li>
						{/* <li className="nav-items__elements-child">
							<Link href="/#events" onClick={handleChange}>
								Events
							</Link>
						</li> */}
						<li className="nav-items__elements-child">
							<Link
								href={
									data.gallery.link ? data.gallery.link : ""
								}
							>
								{data.gallery.text}
							</Link>
						</li>
						<li className="nav-items__elements-child">
							<input
								type="checkbox"
								checked={three}
								onChange={() => {}}
							/>

							<div
								className="nav-hover"
								onClick={() => handleSubOpen(3)}
							>
								<span>
									{data.aboutus.text}
									<FontAwesomeIcon icon={faAngleDown} />
								</span>

								<ul className="nav-links__sub">
									{data.aboutus.subLinks?.map((link) => {
										return (
											<li key={link.text}>
												<Link
													href={link.link}
													target={`${
														link.newPage
															? "_blank"
															: ""
													}`}
												>
													{link.text}
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						</li>
						<li className="nav-items__elements-child">
							<Link
								href={
									data.contactus.link
										? data.contactus.link
										: ""
								}
								onClick={() => setNavOpen(false)}
							>
								{data.contactus.text}
							</Link>
						</li>

						<div className="nav-items__elements-logo">
							<Image
								src="/logo.png"
								alt="Ecole de Criminology"
								width="240"
								height="52"
							/>
						</div>
					</ul>
				</div>
			</div>
		</nav>
	);
}
