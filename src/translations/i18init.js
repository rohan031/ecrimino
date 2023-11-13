import i18n from "i18next";

import enLang from "./languages/en/lang.json";
import frLang from "./languages/fr/lang.json";

i18n.init({
	lng: "en",
	debug: true,
	interpolation: {
		escapeValue: false, // not needed for react as it escapes by default
	},
	// language resources
	resources: {
		en: {
			translation: enLang,
		},
		fr: {
			translation: frLang,
		},
	},
});

export default i18n;
