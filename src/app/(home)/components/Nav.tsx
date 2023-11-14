import React from "react";
import { faPhoneVolume, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
	faFacebookF,
	faLinkedinIn,
	faTwitter,
	faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Translations from "./Translations";
import Icons from "../../../components/icons/Icons";
import { contacts } from "../../../data/contact";
import { socialLinks } from "../../../data/socialLinks";

export default function Nav() {
	return (
		<div className="contact-nav">
			<div className="container contact-nav__items">
				<div>
					<div className="icon-parent">
						<Icons
							link={`tel:${contacts.phone[0].number}`}
							icon={faPhoneVolume}
						/>

						<p>{contacts.phone[0].display}</p>
					</div>
					<div className="icon-parent">
						<Icons
							link={`mailto:${contacts.email[0]}`}
							icon={faEnvelope}
						/>

						<p>{contacts.email[0]}</p>
					</div>
				</div>

				<div>
					<Icons link={socialLinks.facebook} icon={faFacebookF} />

					<Icons link={socialLinks.twitter} icon={faTwitter} />

					<Icons link={socialLinks.whatsapp} icon={faWhatsapp} />

					<Icons link={socialLinks.linkedin} icon={faLinkedinIn} />

					<div className="contact-nav__items-functions">
						<div className="contact-nav__items-functions-item">
							<Translations />
						</div>

						<div className="contact-nav__items-functions-item">
							<Link href={"/login"}> Login </Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
