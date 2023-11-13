"use client";
import { I18nextProvider } from "react-i18next";
import i18next from "../translations/i18init";

interface ProviderProps {
	children: React.ReactNode;
}

function Providers({ children }: ProviderProps) {
	return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}

export default Providers;
