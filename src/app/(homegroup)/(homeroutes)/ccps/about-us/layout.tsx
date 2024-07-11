import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
    title: "Ecole de Criminologie - Historie",
    description:
        "Historique du Centre de Criminologie et de Pathologie sociale (CCPS) rattaché actuellement à l’Ecole de criminologie de l’Université de Kinshasa.",
};

interface HomeGroupLayoutProps {
    children: React.ReactNode;
}

export default function HomeGroupLayout({ children }: HomeGroupLayoutProps) {
    return <>{children}</>;
}
