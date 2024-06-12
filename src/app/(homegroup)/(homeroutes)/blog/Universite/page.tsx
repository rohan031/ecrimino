import Link from "next/link";
import React from "react";
import style from "./page.module.scss";
const Université = () => {
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
                    sur le marché son deuxième diplômé
                </h1>
                <p>4 September, 2023</p>
            </div>
            <div className={style.img}>
                <img src="/blog/blog3.jpg" />
            </div>
            <div className={style.content}>
                <p>
                    Sa recherche a porté sur le dispositif préventif de la lutte
                    contre le blanchiment des capitaux et le financement du
                    terrorisme, fondé sur deux recommandations du groupe
                    d&apos;action financière, à savoir l&apos;obligation de
                    déclaration de soupçon et l&apos;obligation de vigilance.
                </p>
                <p>
                    Selon Fabrice Bolenge, les assujettis ont l&apos;obligation
                    de mettre en œuvre des mesures ou des mécanismes permettant
                    de rendre effectif le dispositif préventif de lutte contre
                    le blanchiment des capitaux et le financement du terrorisme.
                    En vue de délimiter son champ de recherche, le récipiendaire
                    s&apos;est intéressé à l&apos;assujetti issu du secteur de
                    l&apos;argent mobile, dénommé Vodacash SA, dont la marque
                    commerciale est intitulée M-Pesa.
                </p>
                <p>
                    Son problème de recherche relève de l&apos;écart observé
                    entre ce que prévoit le dispositif préventif de lutte contre
                    le blanchiment des capitaux et le financement du terrorisme
                    et les pratiques des acteurs.
                </p>
            </div>
            <div className={style.img}>
                <img src="/blog/blog3.1.jpg" />
            </div>
            <div className={style.content}>
                <p>
                    A l&apos;en croire, il se manifeste par l&apos;émergence des
                    situations problématiques ou des pratiques non conformes
                    contraires aux normes ou aux mesures préventives du
                    blanchiment des capitaux et du financement du terrorisme.
                </p>
                <p>
                    Au départ d&apos;un tel constat, Fabrice Bolenge s&apos;est
                    posé la question de savoir, comment comprendre les pratiques
                    problématiques qui découlent de la mise en œuvre des mesures
                    préventives du blanchiment des capitaux et du financement du
                    terrorisme dans le secteur de l&apos;argent mobile à
                    Kinshasa à travers M-Pesa ?
                </p>
                <p>
                    Afin de répondre à cette question de départ, le
                    récipiendaire a mobilisé la méthodologie qualitative, rendue
                    opérationnelle par des entretiens semi-directifs et des
                    observations in situ, dont les données ont subi un examen
                    méthodique et systématique par l&apos;analyse de contenu, en
                    mobilisant la théorie des réseaux d&apos;acteurs sociaux de
                    Vincent Lemieux, qui s&apos;articule autour de trois
                    concepts, à savoir le concept d&apos;appartenance, le
                    concept d&apos;appropriation et le concept de la gouverne,
                    qui lui ont permis de construire un savoir autour de la mise
                    en œuvre des mesures préventives du blanchiment des capitaux
                    et du financement du terrorisme par le canal de
                    l&apos;argent mobile.
                </p>
            </div>
            <div className={style.bread2}>
                <div>
                    <Link href="/blog/Me-Carlos-ngwapitshi">
                        {" "}
                        <p>&#60; Previous</p>
                    </Link>
                </div>
                <div>
                    <Link href="/blog/Kinshasa">
                        {" "}
                        <p>Next &#62;</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Université;
