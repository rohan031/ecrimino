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
		<footer id="footer">
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
						<Icons
							link={socialLinks.facebook}
							icon={faFacebookF}
							label="open facebook page"
						/>

						<Icons
							link={socialLinks.twitter}
							icon={faTwitter}
							label="open twitter page"
						/>

						<Icons
							link={socialLinks.whatsapp}
							icon={faWhatsapp}
							label="open whatsapp page"
						/>

						<Icons
							link={socialLinks.linkedin}
							icon={faLinkedinIn}
							label="open linkedin page"
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
								<Link href="/academics/masters">
									{t("footer.masters")}
								</Link>

								<Link href="/gallery">
									{t("footer.gallery")}
								</Link>

								{/* <Link href="/alumini">
									{t("footer.alumini")}
								</Link> */}

								<Link href="/admissions">
									{t("footer.admissions")}
								</Link>

								<Link href="/certifications">
									{t("footer.certifications")}
								</Link>

								<Link href="/documents">
									{t("footer.document")}
								</Link>

								<Link href="/contactus">
									{t("footer.contactUs")}
								</Link>

								<Link href="/faculty">
									{t("footer.faculty")}
								</Link>
							</div>
						</div>

						<Link
							className="library footer-item__head"
							target="_blank"
							href="https://uclouvain.be/fr/instituts-recherche/juri/cridep/archives.html"
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
