import React from "react";
import { faPhoneVolume, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
	faFacebookF,
	faLinkedinIn,
	faTwitter,
	faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Icons from "@/components/icons/Icons";
import { contacts } from "@/data/contact";
import { socialLinks } from "@/data/socialLinks";

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

					<div className="contact-nav__items-functions">
						<div className="contact-nav__items-functions-item">
							<Link href={"/"}> Login </Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
