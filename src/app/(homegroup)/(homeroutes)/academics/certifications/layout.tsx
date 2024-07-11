import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
    title: "Ecole de Criminologie - Certifications",
    description:
        "Formations certifiantes et renforcement des capacités L’École assure également des formations certifiantes en : Gouvernance de la sécurité ; Gouvernance économique ; Paix et gouvernance.",
};

interface HomeGroupLayoutProps {
    children: React.ReactNode;
}

export default function HomeGroupLayout({ children }: HomeGroupLayoutProps) {
    return <>{children}</>;
}
