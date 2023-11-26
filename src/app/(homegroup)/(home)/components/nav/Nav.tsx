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
import Icons from "../../../../../components/icons/Icons";
import { contacts } from "../../../../../data/contact";
import { socialLinks } from "../../../../../data/socialLinks";

export default function Nav() {
	return (
		<div className="contact-nav">
			<div className="container contact-nav__items">
				<div>
					<Icons
						link={`tel:${contacts.phone[0].number}`}
						icon={faPhoneVolume}
					>
						{contacts.phone[0].display}
					</Icons>
					<Icons
						link={`mailto:${contacts.email[0]}`}
						icon={faEnvelope}
					>
						{contacts.email[0]}
					</Icons>
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
