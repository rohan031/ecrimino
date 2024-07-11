import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
    title: "Ecole de Criminologie - PhD",
    description:
        "L’École de Criminologie et le Centre de criminologie et de pathologie sociale (CCPS), qui lui est rattaché, enten- dent produire des recherches fondamentales et des re- cherches appliquées.",
};

interface HomeGroupLayoutProps {
    children: React.ReactNode;
}

export default function HomeGroupLayout({ children }: HomeGroupLayoutProps) {
    return <>{children}</>;
}
