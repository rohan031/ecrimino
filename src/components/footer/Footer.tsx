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
import { contacts } from "@/data/contact";
import { socialLinks } from "@/data/socialLinks";

interface Links {
	heading: string;
	subLinks: {
		text: string;
		link: string;
	}[];
}

interface Content {
	heading: string;
	text: string;
}

interface FooterProps {
	data: {
		address: Content;
		links: Links;
		library: {
			heading: string;
			link: string;
		};
		youtube: Content;
		phone: {
			heading: string;
		};
		email: {
			heading: string;
		};
	};
}

export default function Footer({ data }: FooterProps) {
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
							{data.address.heading}
						</h2>
						<p className="footer-item__text">{data.address.text}</p>
					</div>

					<div className="contacts">
						<div className="contacts-item">
							<h2 className="footer-item__head">
								{data.phone.heading}
							</h2>

							<div className="items">{contactPhone}</div>
						</div>
						<div className="contacts-item">
							<h2 className="footer-item__head">
								{data.email.heading}
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
								{data.links.heading}
							</h2>

							<div className="links">
								{data.links.subLinks.map((link) => {
									return (
										<Link key={link.text} href={link.link}>
											{link.text}
										</Link>
									);
								})}
							</div>
						</div>

						<Link
							className="library footer-item__head"
							target="_blank"
							href={data.library.link}
						>
							{data.library.heading}
						</Link>
					</div>

					<div className="youtube-container">
						<h2 className="footer-item__head">
							{data.youtube.heading}
						</h2>

						<Videos error={data.youtube.text} />
					</div>
				</div>
			</div>

			<p className="copyright">
				Copyright © 2024 , Ecole de Criminologie All rights reserved.
				<br />
				Powered by{" "}
				<a
					href="https://adgytec.in"
					target="_blank"
					style={{ color: "hsl(51, 100%, 50%)", fontWeight: "bold" }}
				>
					Adgytec
				</a>
				.
			</p>
		</footer>
	);
}
