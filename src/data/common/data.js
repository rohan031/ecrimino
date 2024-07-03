import { links } from "../links";

export const nav = {
	academics: {
		text: "Enseignement",
		subLinks: [
			{ text: "Masters", link: links.masters },
			{ text: "Phd", link: links.phd },
			{ text: "Certifications", link: links.certifications },
		],
	},

	admissions: {
		text: "Admissions",
		link: links.admissions,
	},

	ccps: {
		text: "CCPS",
		subLinks: [
			{
				text: "Historie",
				link: links.ccpsAboutUs,
			},
			// {
			// 	text: "Trainings",
			// 	link: links.training,
			// },
			{
				text: "Chaire guy houchon",
				link: links.cherguy,
				newPage: true,
			},
			// {
			// 	text: "Partners",
			// 	link: links.partner,
			// },
		],
	},

	gallery: {
		text: "Gallery",
		link: links.gallery,
	},
	news: {
		text: "Actualite",
		link: links.news,
	},

	aboutus: {
		text: "A propos de nous",
		subLinks: [
			{
				text: "Qui sommes nous",
				link: links.aboutus,
			},
			{
				text: "Personnel academique et scientifique",
				link: links.faculty,
			},
			// {
			// 	text: "Documents",
			// 	link: links.docs,
			// },
		],
	},

	contactus: {
		text: "Contact Us",
		link: "#footer",
	},
};

export const footer = {
	address: {
		heading: "Entrer en contact",
		text: "L’École de criminologie est située à l’Université de Kinshasa, entre l’ERAIFT et le CNPP (en diagonale du Centre hospitalier du Mont-Amba).",
	},
	links: {
		heading: "Liens utiles",
		subLinks: [
			{
				text: "Masters",
				link: links.masters,
			},
			{
				text: "Gallery",
				link: links.gallery,
			},
			{
				text: "Admissions",
				link: links.admissions,
			},
			{
				text: "Document",
				link: links.docs,
			},
			{
				text: "Certifications",
				link: links.certifications,
			},
			{
				text: "Personnel academique et scientifique",
				link: links.faculty,
			},
		],
	},
	library: {
		heading: "Accéder à la bibliothèque",
		link: links.library,
	},
	youtube: {
		heading: "Notre chaîne Youtube",
		text: "Impossible de récupérer des vidéos YouTube !! Visitez notre chaîne sur Youtube.",
	},

	phone: {
		heading: "Téléphone",
	},

	email: {
		heading: "E-mail",
	},
};
