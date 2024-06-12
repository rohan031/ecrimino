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
                    Me Carlos ngwapitshi: » La pratique du
                    ‘&apos;Visa&apos;&apos; dans les Cours et Tribunaux doit
                    être supprimée parce qu&apos;elle viole le secret de
                    délibéré, l&apos;indépendance du juge et favorise le
                    monnayage des décisions judiciaires »
                </h1>
                <p>4 September, 2023</p>
            </div>
            <div className={style.img}>
                <img src="/blog/blog2.jpg" />
            </div>
            <div className={style.link}>
                <Link href="">
                    <img src="/facebook.svg" alt="" />
                </Link>
                <Link href="">
                    <img src="/x.svg" alt="" />
                </Link>
                <Link href="">
                    <img src="/whatsapp.svg" alt="" />
                </Link>
                <Link href="">
                    <img src="/reddit.svg" alt="" />
                </Link>
                <Link href="">
                    <img src="/linkedin.svg" alt="" />
                </Link>
                <Link href="">
                    <img src="/email.svg" alt="" />
                </Link>
                <Link href="">
                    <img src="/message.svg" alt="" />
                </Link>
                <Link href="">
                    <img src="/snapchat.svg" alt="" />
                </Link>
            </div>
            <div className={style.content}>
                <p>
                    Me. Carlos Ngwapitshi Ngwamashi, orateur dudit séminaire est
                    resté catégorique quant à cette question. Pour lui, la
                    pratique du visa « terni l&apos;image de la justice
                    congolaise et profite aux mafieux s&apos;érigeant ainsi
                    comme « une véritable soupape de l&apos;imposition de la
                    volonté du chef de juridiction.
                </p>
                <p>
                    Me. Carlos Ngwapitshi estime par ailleurs que le
                    &apos;visa&apos; devenu monnaie courante dans les Cours et
                    Tribunaux constitue un mal de plus qui affecte le
                    fonctionnement de la justice congolaise.
                </p>
                <p>
                    La pratique du visa devant les Cours et Tribunaux congolais
                    : mécanisme de contrôle ou voile pudique de la corruption ?
                    » Cette question si sensible a été au cœur d&apos;un
                    séminaire organisé ce vendredi 24 mai 2024 par le Centre de
                    Criminologie et de Pathologie Sociale de l&apos;Université
                    de Kinshasa. Me. Carlos Ngwapitshi Ngwamashi, orateur dudit
                    séminaire est resté catégorique quant à cette question. Pour
                    lui, la pratique du visa « terni l&apos;image de la justice
                    congolaise et profite aux mafieux » s&apos;érigeant ainsi
                    comme « une véritable soupape de l&apos;imposition de la
                    volonté du chef de juridiction. » Il a été démontré que la
                    pratique de visa tend à obtenir l&apos;encadrement ou la
                    formation des jeunes magistrats qui arrivent à la
                    magistrature et l&apos;unification de la jurisprudence. Ces
                    sont des points importants que le Conseil Supérieur de la
                    Magistrature ou le législateur peut également récupérer pour
                    pouvoir les utiliser autrement. Nous avons proposés le cadre
                    comme les plénières où ces questions-là peuvent être
                    débattues sans pour autant que le juge ne soit soumis à
                    proposer son projet de jugement au chef de juridiction qui
                    n&apos;a pas assisté au débat, qui n&apos;a pas connaissance
                    du dossier mais à qui l&apos;on doit soumettre ce projet et
                    il peut même imposer sa position au détriment de celle qui
                    avait été retenue par la composition », a souhaité Me.
                    Carlos Ngwapitshi.
                </p>
                <p>
                    Le &apos;visa&apos;, cette pratique instaurée en début des
                    années 2000 par une résolution du Conseil Supérieur de la
                    Magistrature constitue le fait pour un juge de soumettre son
                    projet de jugement au chef de juridiction pour obtenir le
                    paraphe de ce dernier avant le prononcé. Son auteur adresse
                    ses observations du point de vue de la forme et/ou du fond.
                    L&apos;objectif est principalement l&apos;encadrement, le
                    contrôle et la supervision des propositions des jugements
                    afin qu&apos;ils soient conformes au droit. S&apos;il est
                    décrié par certains pour ses dérives, il faudra tout de même
                    reconnaitre qu&apos;il existe les chefs des juridictions qui
                    ne s&apos;adonnent pas à la corruption et/ou à
                    l&apos;imposition de position à travers le visa et ne
                    l&apos;utilisent que pour éviter les dérives dans les prises
                    des décisions.
                </p>
            </div>

            <div className={style.bread2}>
                <div>
                    <Link href="/blog/Kinshasa">
                        {" "}
                        <p>&#60; Previous</p>
                    </Link>
                </div>
                <div>
                    <Link href="/blog/Universite">
                        {" "}
                        <p>Next &#62;</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default page;
