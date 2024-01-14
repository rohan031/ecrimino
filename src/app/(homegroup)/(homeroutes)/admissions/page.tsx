import React from "react";
import { data } from "@/data/admission";
import Form from "./components/Form";

export default function Page() {
	return (
		<div className="admissions">
			<div className="container">
				<h1>Admission</h1>

				<p className="admissions-text">{data.text}</p>

				<div className="admissions-table">
					<h2>Application Form Fee</h2>

					<div className="admissions-table__content">
						<table cellPadding={10}>
							<thead>
								<tr>
									<th>Per Course</th>

									<th>Amount</th>
								</tr>
							</thead>

							<tbody>
								<tr>
									<td>Application Form Fee</td>

									<td>$100</td>
								</tr>
							</tbody>
						</table>

						<p className="note">*to be paid at the reception</p>
					</div>
				</div>

				<div className="admissions-form">
					<h2>Your details</h2>

					<Form />
				</div>
			</div>
		</div>
	);
}
