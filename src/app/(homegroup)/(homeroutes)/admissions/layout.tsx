import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
    title: "Ecole de Criminologie - Admission",
    description:
        "Découvrez une carrière passionnante dans le domaine de la criminologie en rejoignant notre programme d'études.",
};

interface HomeGroupLayoutProps {
    children: React.ReactNode;
}

export default function HomeGroupLayout({ children }: HomeGroupLayoutProps) {
    return <>{children}</>;
}
