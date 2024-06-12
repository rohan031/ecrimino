import Link from "next/link";
import React from "react";
import style from "./page.module.scss";
const page = () => {
    return (
        <div className={style.blog}>
            <div className={style.bread}>
                <p>
                    <Link href="/blog">Home</Link> &#62; <span>Blog</span>
                </p>
            </div>
            <div className={style.heading}>
                <h1>
                    Université de Kinshasa : L&apos;école de criminologie lance
                    sur le marché son quatrième diplômé
                </h1>
                <p>4 September, 2023</p>
            </div>
            <div className={style.img}>
                <img src="/blog/blog1.jpg" />
            </div>
            <div className={style.content}>
                <p>
                    Selon le récipiendaire du jour, les violences survenues dans
                    la cité de Yumbi ainsi qu&apos;à Nkolo et Bongende en 2018,
                    entre les communautés Tende et Nunu, ont engendré un lourd
                    tribut en vies humaines et en dommages matériels.
                </p>
                <p>
                    Les conséquences de ces affrontements se sont traduites par
                    un bilan tragique avec au moins 351 morts, 133 blessés, la
                    destruction de 85 pirogues, 804 maisons d&apos;habitation et
                    l&apos;incendie de 2 centres de santé. Face à ces évènements
                    d&apos;une gravité indéniable, qualifiés
                    d&apos;inacceptables et de négatifs susceptibles d&apos;être
                    étudiés dans le cadre de la criminologie, l&apos;intérêt de
                    sa recherche s&apos;est porté sur la compréhension de ces
                    violences en tant que situation problème criminalisée.
                </p>
                <p>
                    Les entretiens exploratoires qu&apos;il a menés avec les
                    différentes parties prenantes, incluant les membres des
                    communautés Tende et Nunu, les représentants des ONG ainsi
                    que certains agents de l&apos;Etat ont révélé que le conflit
                    entre ces deux communautés était étroitement lié à la
                    question de la légitimé du rapport à la terre dans le
                    territoire de Yumbi. Nicolas Wemakoy a mobilisé deux grilles
                    théoriques. L&apos;interactionnisme symbolique pour étudier
                    les interactions sociales entre les différents acteurs
                    impliqués dans ce conflit foncier, afin de dégager les
                    significations et les interprétations symboliques et le
                    pluralisme juridique pour appréhender les différents
                    systèmes juridiques et normatifs en présence et leurs
                    implications dans le conflit foncier à Yumbi.
                </p>
            </div>
            <div className={style.img}>
                <img src="/blog/blog1.1.jpg" />
            </div>
            <div className={style.content}>
                <p>
                    C&apos;est la méthodologie qualitative qui a été jugée
                    adéquate par le récipiendaire pour cette recherche dans la
                    mesure où, elle permet d&apos;obtenir des acteurs le sens
                    qu&apos;ils donnent à leurs actes. En plus, l&apos;entretien
                    semi-directif lui a permis de recueillir les données de sa
                    recherche. L&apos;échantillonnage de son étude a été
                    constitué de quatre groupes dont : 13 Tende, 12 Nunu, 5
                    responsables des ONG et 3 agents de l&apos;Etat. A l&apos;en
                    croire, son terrain de production des données est constitué
                    du territoire de Yumbi, de la prison militaire de Ndolo, de
                    la ville d&apos;Inongo et de la ville de Kinshasa. Pour
                    analyser les données de sa recherche, Nicolas Wemakoy a pu
                    recourir à la méthode d&apos;analyse thématique.
                </p>
                <p>
                    En termes des résultats de sa recherche, Nicolas Wemakoy
                    Omokote s&apos;est appesanti sur l&apos;historicité et le
                    dynamisme du conflit de Yumbi, la résurgence des violences :
                    manifestation d&apos;un conflit foncier latent et en fin, le
                    conflit normatif sur la source de légitimité du rapport à la
                    terre de yumbi et les tentatives de son dépassement. Selon
                    le récipiendaire, le conflit foncier entre les Tende et les
                    Banunu trouve ses racines dans l&apos;abolition de la
                    chefferie Batende en 1943 par l&apos;Administration
                    coloniale, remplacée par le secteur Mistandunga, englobant
                    le territoire de Yumbi et créant deux groupements distincts,
                    l&apos;un pour les Batende et l&apos;autre pour les Banunu.
                    Et d&apos;ajouter, les Batende voient l&apos;abolition de
                    leur chefferie comme l&apos;élément déclencheur du conflit,
                    tandis que les Banunu considèrent cette mesure comme une
                    solution nécessaire pour éviter les violences entre deux
                    communautés coexistantes au sein d&apos;une même chefferie.
                </p>
                <p>
                    Ainsi, ces événements révèlent deux récits contradictoires
                    sur l&apos;origine du conflit, reflétant des perceptions
                    divergentes entre les deux communautés. Dans cette logique,
                    l&apos;étude menée par Nicolas Wemakoy illustre le caractère
                    dynamique du conflit de Yumbi qui fait que l&apos;identité
                    ethnique devienne plus prééminente lors des périodes de
                    violence, où chaque individu doit s&apos;attribuer une
                    identité, soit Tende soit Nunu, pour légitimer sa position
                    dans la défense des terres. Bien que le conflit soit souvent
                    manipulé à des fins politiques pendant les élections, son
                    essence demeure fondamentalement foncière dans la mesure où
                    les deux communautés revendiquent les terres ancestrales
                    dans le territoire commun de Yumbi. Les Tende se considèrent
                    comme les premiers occupants de ce territoire, hérité de
                    leurs ancêtres avant la colonisation.
                </p>
            </div>
            <div className={style.bread2}>
                <div>
                    <Link href="/blog/Universite">
                        {" "}
                        <p>&#60; Previous</p>
                    </Link>
                </div>
                <div>
                    <Link href="/blog/Me-Carlos-ngwapitshi">
                        {" "}
                        <p>Next &#62;</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default page;
