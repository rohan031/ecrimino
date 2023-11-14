"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function Address() {
	const { t } = useTranslation("translation");

	return <p className="footer-item__text">{t("address")}</p>;
}
