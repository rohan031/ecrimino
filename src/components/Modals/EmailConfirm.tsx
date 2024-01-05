import React from "react";

interface EmailConfirmProps {
	confirmEmail: React.MutableRefObject<HTMLDialogElement | null>;
}

export default function EmailConfirm({ confirmEmail }: EmailConfirmProps) {
	const handleClose = () => {
		confirmEmail.current?.close();
	};

	return (
		<div className="email-confirm-item">
			<h2>Successfully sent email confirmation mail</h2>

			<button onClick={handleClose}>Close</button>
		</div>
	);
}
