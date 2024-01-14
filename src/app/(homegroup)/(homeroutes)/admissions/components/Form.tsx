"use client";

import { createAdmissionPdf } from "@/actions/action";
import React, { useState } from "react";

export default function Form() {
	return (
		<form action={createAdmissionPdf}>
			<div className="form-name">
				<div className="input">
					<label htmlFor="first-name">First Name </label>
					<input
						type="text"
						name="first-name"
						id="first-name"
						// placeholder="First Name..."
						required
					/>
				</div>

				<div className="input">
					<label htmlFor="last-name">Last Name </label>
					<input
						type="text"
						name="last-name"
						id="last-name"
						// placeholder="Last Name..."
						required
					/>
				</div>
			</div>

			<div className="input">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					// placeholder="Email..."
					required
				/>
			</div>

			<div className="input">
				<label htmlFor="phone-no">Phone Number</label>
				<input
					type="number"
					name="phone-number"
					id="phone-no"
					// placeholder="Phone Number"
					pattern="[0-9]{10}"
					max={9999999999}
					min={1000000000}
					required
				/>
			</div>

			<div className="button">
				<button type="submit">Submit</button>
			</div>
		</form>
	);
}
