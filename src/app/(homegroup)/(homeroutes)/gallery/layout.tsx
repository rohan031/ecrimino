import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
    title: "Ecole de Criminologie - Gallery",
    description:
        "lundi 8 avril 2024 les résulats de l'étude d'impacts et de perceptions de la réforme de la Police Nationale CongolaiseLundi 8 Avril 2024 Les Résulats De L'étude D'impacts Et De Perceptions De La Réforme De La Police Nationale Congolaise",
};

interface HomeGroupLayoutProps {
    children: React.ReactNode;
}

export default function HomeGroupLayout({ children }: HomeGroupLayoutProps) {
    return <>{children}</>;
}
