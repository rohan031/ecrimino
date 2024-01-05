import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropDownItemProps {
	children: React.ReactNode;
}

export default function DropDownItem({ children }: DropDownItemProps) {
	return (
		<DropdownMenu.Item onSelect={(e) => e.preventDefault()} asChild>
			{children}
		</DropdownMenu.Item>
	);
}
