import React from "react";
import Icons from "../icons/Icons";
import {
	faFacebookF,
	faLinkedinIn,
	faTwitter,
	faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Videos from "../videos/Videos";
import Address from "./Address";
import { contacts } from "@/data/contact";
import { socialLinks } from "@/data/socialLinks";

export default function Footer() {
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
						<h2 className="footer-item__head">Get in Touch</h2>
						<Address />
					</div>

					<div className="contacts">
						<div className="contacts-item">
							<h2 className="footer-item__head">Phone</h2>

							<div className="items">{contactPhone}</div>
						</div>
						<div className="contacts-item">
							<h2 className="footer-item__head">E-mail</h2>

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
							<h2 className="footer-item__head">Useful Links</h2>

							<div className="links">
								<Link href="/research">Research</Link>

								<Link href="/feedback">Feedback</Link>

								<Link href="/alumini">Alumini</Link>

								<Link href="/admissions">Admissions</Link>

								<Link href="/certifications">
									Certifications
								</Link>

								<Link href="/document">Document</Link>

								<Link href="/contactus">Contact Us</Link>

								<Link href="/masters">Masters</Link>
							</div>
						</div>

						<Link
							className="library footer-item__head"
							href="/library"
						>
							Access library
						</Link>
					</div>

					<div className="youtube-container">
						<h2 className="footer-item__head">
							Our Youtube Channel
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
