import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
    title: "Ecole de Criminologie/Qui sommes nous",
    description:
        "L’École de criminologie de l’Université de Kinshasa a été créée par un Arrêté du Ministre de l’ESU le 30 octobre 2018 tel que modifié et complété par le 24 février 2021, à la suite du développement de la recherche et des activités de formation organisées par le Centre de criminologie et de pathologie sociale (CCPS), actuellement rattaché à l’école, depuis le 16 mai 2013.",
};

interface HomeGroupLayoutProps {
    children: React.ReactNode;
}

export default function HomeGroupLayout({ children }: HomeGroupLayoutProps) {
    return <>{children}</>;
}
