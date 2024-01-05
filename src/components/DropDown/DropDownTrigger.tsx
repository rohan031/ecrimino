import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropDownTriggerProps {
	children: React.ReactNode;
}

export default function DropDownTrigger({ children }: DropDownTriggerProps) {
	return <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>;
}
