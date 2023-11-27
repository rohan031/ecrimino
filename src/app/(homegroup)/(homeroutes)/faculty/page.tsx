"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function Faculty() {
	const { t } = useTranslation("translation");

	return (
		<>
			<div className="info-page__heading faculty">
				<h1>{t("faculty.faculty")}</h1>
			</div>

			<div className="info-page__container"></div>
		</>
	);
}
