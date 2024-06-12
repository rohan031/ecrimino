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
            <div>
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
                <p></p>
            </div>
        </div>
    );
};

export default page;
