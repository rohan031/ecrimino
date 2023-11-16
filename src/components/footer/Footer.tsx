"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Icons from "../icons/Icons";
import {
	faFacebookF,
	faLinkedinIn,
	faTwitter,
	faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Videos from "../videos/Videos";
import { contacts } from "@/data/contact";
import { socialLinks } from "@/data/socialLinks";

export default function Footer() {
	const { t } = useTranslation("translation");

	const contactPhone = contacts.phone.map((item) => {
		return (
			<a key={item.number} href={`tel:${item.number}`}>
				{item.display}
			</a>
		);
	});

	const contactEmail = contacts.email.map((item) => {
		return (
			<a key={item} href={`mailto:${item}`}>
				{item}
			</a>
		);
	});

	return (
		<footer>
			<div className="container footer">
				<div className="footer-item">
					<div className="location">
						<h2 className="footer-item__head">
							{t("footer.addressHead")}
						</h2>
						<p className="footer-item__text">
							{t("footer.address")}
						</p>
					</div>

					<div className="contacts">
						<div className="contacts-item">
							<h2 className="footer-item__head">
								{t("footer.phone")}
							</h2>

							<div className="items">{contactPhone}</div>
						</div>
						<div className="contacts-item">
							<h2 className="footer-item__head">
								{t("footer.email")}
							</h2>

							<div className="items">{contactEmail}</div>
						</div>
					</div>

					<div className="social">
						<Icons link={socialLinks.facebook} icon={faFacebookF} />

						<Icons link={socialLinks.twitter} icon={faTwitter} />

						<Icons link={socialLinks.whatsapp} icon={faWhatsapp} />

						<Icons
							link={socialLinks.linkedin}
							icon={faLinkedinIn}
						/>
					</div>
				</div>

				<div className="footer-item">
					<div className="link-group">
						<div className="footer-item__container">
							<h2 className="footer-item__head">
								{t("footer.linksHead")}
							</h2>

							<div className="links">
								<Link href="/research">
									{t("footer.research")}
								</Link>

								<Link href="/feedback">
									{t("footer.feedback")}
								</Link>

								<Link href="/alumini">
									{t("footer.alumini")}
								</Link>

								<Link href="/admissions">
									{t("footer.admissions")}
								</Link>

								<Link href="/certifications">
									{t("footer.certifications")}
								</Link>

								<Link href="/document">
									{t("footer.document")}
								</Link>

								<Link href="/contactus">
									{t("footer.contactUs")}
								</Link>

								<Link href="/masters">
									{t("footer.masters")}
								</Link>
							</div>
						</div>

						<Link
							className="library footer-item__head"
							href="/library"
						>
							{t("footer.libraryHead")}
						</Link>
					</div>

					<div className="youtube-container">
						<h2 className="footer-item__head">
							{t("footer.youtubeHead")}
						</h2>

						<Videos />
					</div>
				</div>
			</div>

			<p className="copyright">
				Copyright © 2023 , Ecole de Criminologie All rights reserved.
			</p>
		</footer>
	);
}
