"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
	faFacebookF,
	faLinkedinIn,
	faTwitter,
	faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Nav() {
	const { t, i18n } = useTranslation("translation");

	const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		i18n.changeLanguage(e.target.value);
	};

	return (
		<div className="container">
			<div className="contact-nav">
				<div>
					<div className="icon-parent">
						<a
							href="tel:+243813-657-483"
							className="contact-nav__icon"
						>
							<FontAwesomeIcon icon={faPhoneVolume} />
						</a>
						<p>(+243) 813 657 483</p>
					</div>
					<div className="icon-parent">
						<a
							href="mailto:ecole.criminologie@unikin.ac.cd"
							className="contact-nav__icon"
						>
							<FontAwesomeIcon icon={faEnvelope} />
						</a>
						<p>ecole.criminologie@unikin.ac.cd</p>
					</div>
				</div>

				<div>
					<a
						href="https://facebook.com"
						target="_blank"
						className="contact-nav__icon"
					>
						<FontAwesomeIcon icon={faFacebookF} />
					</a>
					<a
						href="https://twitter.com"
						target="_blank"
						className="contact-nav__icon"
					>
						<FontAwesomeIcon icon={faTwitter} />
					</a>
					<a
						href="https://whatsapp.com"
						target="_blank"
						className="contact-nav__icon"
					>
						<FontAwesomeIcon icon={faWhatsapp} />
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						className="contact-nav__icon"
					>
						<FontAwesomeIcon icon={faLinkedinIn} />
					</a>

					<div className="contact-nav__functions">
						<div className="contact-nav__functions-item">
							<select name="language" onChange={handleLangChange}>
								<option value="en">🇬🇧</option>
								<option value="fr">🇫🇷</option>
							</select>
						</div>

						<div className="contact-nav__functions-item">
							<Link href={"/login"}> Login </Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
