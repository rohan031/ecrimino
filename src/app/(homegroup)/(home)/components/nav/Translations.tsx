"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Translations() {
	const { t, i18n } = useTranslation("translation");
	const [lang, setLang] = useState<string>("fr");

	useEffect(() => {
		i18n.changeLanguage(lang);
	}, [lang, i18n]);

	const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLang(e.target.value);
	};

	return (
		<div className="contact-nav__functions-item">
			<select name="language" onChange={handleLangChange} value={lang}>
				<option value="en">🇬🇧</option>
				<option value="fr">🇫🇷</option>
			</select>
		</div>
	);
}
