"use client";

import { useTranslation } from "react-i18next";

export default function Home() {
	const { t, i18n } = useTranslation("translation");

	return (
		<div>
			Ecole de criminology
			<p>{t("greeting")}</p>
		</div>
	);
}
