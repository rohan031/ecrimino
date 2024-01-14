"use server";
import createReport from "docx-templates";
import fs from "fs";

export async function createAdmissionPdf(formData: FormData) {
	const ext = ".pdf";

	const firstName = formData.get("first-name");
	const lastName = formData.get("last-name");

	const name = firstName + " " + lastName;
	const email = formData.get("email");
	const phoneNumber = formData.get("phone-number");
	const course = formData.get("course");

	const template = fs.readFileSync("./public/future/student-academics.docx");

	const buffer = await createReport({
		template,
		data: {
			name,
			email,
			phoneNumber,
			course,
		},
	});

	// let pdfBuf = await libre.convertAsync(buffer, ext, undefined);
	fs.writeFileSync("report.docx", buffer);
	// console.log(pdfBuf);
}
