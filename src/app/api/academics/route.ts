import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import createReport from "docx-templates";

import path from "path";

const capaitalizeFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const { firstName, lastName, email, phoneNumber, course } =
			await req.json();

		const name =
			capaitalizeFirstLetter(firstName) +
			" " +
			capaitalizeFirstLetter(lastName);

		let templatePath = path.join("./public/future/student-academics.docx");
		const template = fs.readFileSync(templatePath);

		const docxBuffer = await createReport({
			template,
			data: {
				name,
				email,
				phoneNumber,
				course,
			},
		});

		const response = new NextResponse(docxBuffer);

		response.headers.set("content-type", "application/msword");
		return response;
	} catch (error) {
		console.error(error);
	}
}
