import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
    title: "Ecole de Criminologie/Personnel academique et scientifique",
    description:
        "Docteur En Criminologie (Université Catholique De Louvain, Louvain-La-Neuve,2005)",
};

interface HomeGroupLayoutProps {
    children: React.ReactNode;
}

export default function HomeGroupLayout({ children }: HomeGroupLayoutProps) {
    return <>{children}</>;
}
