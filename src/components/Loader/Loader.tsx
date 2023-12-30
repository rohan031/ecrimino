import React from "react";

export default function Loader({ ...props }) {
	return (
		<div {...props}>
			<div className="spinner"></div>
		</div>
	);
}
