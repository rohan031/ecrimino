"use client";

import React, { useEffect, useState } from "react";
import styles from "./socialshare.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebookF,
	faLinkedinIn,
	faReddit,
	faWhatsapp,
	faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface SocialShareProps {
	title: string;
}
const SocialShare = ({ title }: SocialShareProps) => {
	const [url, setUrl] = useState<string>("");

	useEffect(() => {
		setUrl(window.location.toString());
	}, []);

	const emailBody = `Hey check this out at: ${url}`;
	return (
		<div className={styles.social}>
			<a
				href={`https://www.facebook.com/sharer.php?u=${url}`}
				target="_blank"
				className={styles.facebook}
			>
				<FontAwesomeIcon icon={faFacebookF} />
			</a>

			<a
				href={`https://twitter.com/intent/tweet?url=${url}&text=${title}&via=ecrimino.com&hashtags=ecrimino`}
				target="_blank"
				className={styles.twitter}
			>
				<FontAwesomeIcon icon={faXTwitter} />
			</a>

			<a
				href={`whatsapp://send?text=${title}-${url}`}
				target="_blank"
				className={styles.whatsapp}
			>
				<FontAwesomeIcon icon={faWhatsapp} />
			</a>

			<a
				href={`https://reddit.com/submit?url=${url}&title=${title}`}
				target="_blank"
				className={styles.reddit}
			>
				<FontAwesomeIcon icon={faReddit} />
			</a>

			<a
				href={`https://www.linkedin.com/shareArticle?url=${url}&title=${title}`}
				target="_blank"
				className={styles.linkedin}
			>
				<FontAwesomeIcon icon={faLinkedinIn} />
			</a>

			<a
				href={`mailto:?subject=${title}&body=${emailBody}`}
				target="_blank"
				className={styles.mail}
			>
				<FontAwesomeIcon icon={faEnvelope} />
			</a>
		</div>
	);
};

export default SocialShare;
