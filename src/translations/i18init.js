import i18n from "i18next";

// import enCommon from "./languages/en/lang.json";
// import frCommon from "./languages/fr/lang.json";

// import enFooter from "./languages/en/home/footer.json";
// // import frFooter from "./languages/fr/home/footer.json";

// import enBanner from "./languages/en/home/banner.json";
// // import frBanner from "./languages/fr/home/banner.json";

// import enAcademics from "./languages/en/home/academics.json";
// // import frAcademics from "./languages/fr/home/academics.json";

// import enCCPS from "./languages/en/home/ccps.json";
// // import frCCPS from "./languages/fr/home/ccps.json";

// import enFaculty from "./languages/en/faculty/lang.json";
// import frFaculty from "./languages/fr/faculty/lang.json";

// import enNav from "./languages/en/home/nav.json";
// import frNav from "./languages/fr/home/nav.json";

i18n.init({
	debug: true,
	lng: "fr",
	fallbackLng: "fr",
	interpolation: {
		escapeValue: false, // not needed for react as it escapes by default
	},
	// language resources
	resources: {
		en: {
			translation: {
				// common: enCommon,
				// banner: enBanner,
				// footer: enFooter,
				// academics: enAcademics,
				// ccps: enCCPS,
				// faculty: enFaculty,
				// nav: enNav,
			},
		},
		fr: {
			translation: {
				// common: frCommon,
				// banner: frBanner,
				// footer: frFooter,
				// academics: frAcademics,
				// ccps: frCCPS,
				// faculty: frFaculty,
				// nav: frNav,
			},
		},
	},
});

export default i18n;
