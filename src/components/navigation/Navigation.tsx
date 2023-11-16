"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { usePathname } from "next/navigation";

export default function Navigation() {
	const [navOpen, setNavOpen] = useState<boolean>(false);
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

	return (
		<nav className={`${!show && !navOpen && "hide"}`}>
			<div className="container nav">
				<Link href="/" className="nav-logo">
					<img src="./logo.png" alt="Ecole de Criminology" />
					<h2>Ecole de Criminologie</h2>
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
						<li
							className="hover nav-items__elements-child"
							tabIndex={0}
						>
							Academics
							<Dropdown />
						</li>
						<li className="nav-items__elements-child">
							Admissions
						</li>
						<li
							className="hover nav-items__elements-child"
							tabIndex={0}
						>
							CCPS
							<Dropdown />
						</li>
						<li className="nav-items__elements-child">
							<Link href="/events">Events</Link>
						</li>
						<li className="nav-items__elements-child">
							<Link href="/gallery">Gallery</Link>
						</li>
						<li className="nav-items__elements-child">
							<Link href="/aboutus">About Us</Link>
						</li>
						<li className="nav-items__elements-child">
							Contact Us
						</li>

						<div className="nav-items__elements-logo">
							<img src="./logo.png" alt="Ecole de Criminology" />
							<h2>Ecole de Criminologie</h2>
						</div>
					</ul>
				</div>
			</div>
		</nav>
	);
}
