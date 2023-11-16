import i18n from "i18next";

import enFooter from "./languages/en/home/footer.json";
import frFooter from "./languages/fr/home/footer.json";

import enBanner from "./languages/en/home/banner.json";
import frBanner from "./languages/fr/home/banner.json";

i18n.init({
	debug: true,
	fallbackLng: "en",
	interpolation: {
		escapeValue: false, // not needed for react as it escapes by default
	},
	// language resources
	resources: {
		en: {
			translation: {
				banner: enBanner,
				footer: enFooter,
			},
		},
		fr: {
			translation: {
				banner: frBanner,
				footer: frFooter,
			},
		},
	},
});

export default i18n;
