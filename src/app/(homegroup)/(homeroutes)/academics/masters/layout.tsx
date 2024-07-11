import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
    title: "Ecole de Criminologie/Masters",
    description:
        "L’École de criminologie organise en 2 ans un Master en criminologie suivant le programme des études dans la filière de criminologie défini par le MINESU tel qu’arrimé au LMD dans le domaine des Sciences de l’homme et de la société, et qui comprend les mentions suivantes:",
};

interface HomeGroupLayoutProps {
    children: React.ReactNode;
}

export default function HomeGroupLayout({ children }: HomeGroupLayoutProps) {
    return <>{children}</>;
}
