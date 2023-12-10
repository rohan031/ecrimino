"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function Navigation() {
	const { t } = useTranslation();
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
					<img src="/logo.png" alt="Ecole de Criminology" />
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
									{t("nav.academics")}
									<FontAwesomeIcon icon={faAngleDown} />
								</span>

								<ul className="nav-links__sub">
									<li>
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
									</li>
								</ul>
							</div>
						</li>
						<li className="nav-items__elements-child">
							{t("nav.admissions")}
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
									{t("nav.ccps")}
									<FontAwesomeIcon icon={faAngleDown} />
								</span>

								<ul className="nav-links__sub">
									<li>
										<Link href="/ccps/aboutus">
											{t("nav.ccpsaboutus")}
										</Link>
									</li>
									<li>
										<Link href="/ccps/trainings">
											{t("nav.trainings")}
										</Link>
									</li>
									<li>
										<Link href="https://uclouvain.be/fr/instituts-recherche/juri/cridep/fonds-d-archives-guy-houchon.html">
											{t("nav.cherguy")}
										</Link>
									</li>
									<li>
										<Link href="/ccps/partners">
											{t("nav.partners")}
										</Link>
									</li>
								</ul>
							</div>
						</li>
						{/* <li className="nav-items__elements-child">
							<Link href="/#events" onClick={handleChange}>
								Events
							</Link>
						</li> */}
						<li className="nav-items__elements-child">
							<Link href="/gallery">{t("nav.gallery")}</Link>
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
									{t("nav.aboutus")}
									<FontAwesomeIcon icon={faAngleDown} />
								</span>

								<ul className="nav-links__sub">
									<li>
										<Link href="/history">
											{t("nav.history")}
										</Link>
									</li>
									<li>
										<Link href="/faculty">
											{t("nav.faculty")}
										</Link>
									</li>
									<li>
										<Link href="/documents">
											{t("nav.docs")}
										</Link>
									</li>
								</ul>
							</div>
						</li>
						<li className="nav-items__elements-child">
							{t("nav.contactus")}
						</li>

						<div className="nav-items__elements-logo">
							<img src="./logo.png" alt="Ecole de Criminology" />
						</div>
					</ul>
				</div>
			</div>
		</nav>
	);
}
