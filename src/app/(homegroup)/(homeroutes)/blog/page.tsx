import React from "react";
import style from "./blog.module.scss";
import Link from "next/link";
const Blog = () => {
    return (
        <div className={style.blog}>
            <div className={style.new}>
                <h2>Blogs</h2>
                <span className={style.line}></span>
            </div>
            <div className={style.main}>
                <div className={style.bloghome}>
                    <div className={style.img}>
                        <img src="/blog/blog1.jpg" alt="" />
                    </div>
                    <div className={style.content}>
                        <h3>
                            Université de Kinshasa : L&apos;école de
                            criminologie lance sur le marché son quatrième
                            diplômé
                        </h3>
                        <p>
                            <span>4 September, 2023</span>
                        </p>
                        <p>
                            Présentation des résultats de l approche AHPER pour
                            la sortie de violence des jeunes dits Kuluna, 7
                            septembre 2023
                        </p>
                        <div className={style.links}>
                            <Link href="">Read More</Link>
                            <Link href="">Newsletter</Link>
                        </div>
                    </div>
                </div>
                <div className={style.bloghome2}>
                    <div className={style.item}>
                        <div>
                            {" "}
                            <img src="/blog/blog2.jpg" alt="" />
                        </div>
                        <div>
                            <div className={style.content}>
                                <h3>
                                    Me Carlos ngwapitshi: » La pratique.....
                                </h3>
                                <p>
                                    <span>4 September, 2023</span>
                                </p>
                                <p>La pratique du visa devant les......</p>
                            </div>
                            <div className={style.link}>
                                <Link href="">Know more &#62;</Link>
                            </div>
                        </div>
                    </div>
                    <div className={style.item}>
                        <div>
                            {" "}
                            <img src="/blog/blog3.jpg" alt="" />
                        </div>
                        <div>
                            <div className={style.content}>
                                <h3>Kinshasa : Les criminologues et.....</h3>
                                <p>
                                    {" "}
                                    <span>4 September, 2023</span>
                                </p>
                                <p>Un séminaire de méthodologie a......</p>
                            </div>
                            <div className={style.link}>
                                <Link href="">Know more &#62;</Link>
                            </div>
                        </div>
                    </div>
                    <div className={style.item}>
                        <div>
                            {" "}
                            <img src="/blog/blog4.jpg" alt="" />
                        </div>
                        <div>
                            <div className={style.content}>
                                <h3>Université de Kinshasa : L’école.....</h3>
                                <p>
                                    {" "}
                                    <span>4 September, 2023</span>
                                </p>
                                <p>
                                    Après trois années de dur labeur, l’heure
                                    ......
                                </p>
                            </div>
                            <div className={style.link}>
                                <Link href="">Know more &#62;</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.moreblog}>
                <div>
                    <img src="/blog/blog2.jpg" alt="" />
                </div>
                <div>
                    <div>
                        <h3>
                            Me Carlos ngwapitshi: » La pratique du
                            &quot;Visa&quot; dans les Cours et
                        </h3>
                        <p>
                            <span>4 September, 2023</span>
                        </p>
                    </div>
                    <p>
                        La pratique du visa devant les Cours et les Tribunaux
                        congolais : mécanisme de contrôle ou voile pudique de la
                        corruption ?{" "}
                    </p>
                </div>
            </div>
            <div className={style.moreblog}>
                <div>
                    <img src="/blog/blog3.jpg" alt="" />
                </div>
                <div>
                    <div>
                        <h3>
                            Kinshasa : Les criminologues et apprenants en
                            criminologies outillés par{" "}
                        </h3>
                        <p>
                            {" "}
                            <span>4 September, 2023</span>
                        </p>
                    </div>

                    <p>
                        Un séminaire de méthodologie a été organisé ce mercredi
                        27 Mars 2024 à l’Institut français de Kinshasa. Ce
                        séminaire a
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Blog;
