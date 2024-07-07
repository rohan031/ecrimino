"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./blogs.module.scss";
import Loader from "@/components/loader/Loader";
import BlogItem from "./components/BlogItem/BlogItem";

export interface Blog {
	title: string;
	summary?: string;
	author: string;
	blogId: string;
	createdAt: string;
	cover: string;
}

const Blogs = () => {
	const [loading, setLoading] = useState(true);
	const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
	const [search, setSearch] = useState<string>("");

	const getAllBlogs = useCallback(() => {
		const url = "https://api.adgytec.in/v1/services/blogs";

		fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					throw new Error(res.message);
				}

				setAllBlogs(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		getAllBlogs();
	}, [getAllBlogs]);

	const elements: JSX.Element[] = [];
	allBlogs.forEach((blog) => {
		const { blogId, title, author } = blog;
		const element = <BlogItem key={blogId} blog={blog} />;

		if (search.length === 0) {
			elements.push(element);
			return;
		}

		if (
			blogId.toLowerCase().includes(search.toLowerCase()) ||
			title.toLowerCase().includes(search.toLowerCase()) ||
			author.toLowerCase().includes(search.toLowerCase())
		)
			elements.push(element);
	});

	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		);
	}

	return (
		<div className="container-blog">
			<div className={styles.blogs}>
				<div className={styles.search}>
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Chercher les blogs..."
					/>
				</div>

				{allBlogs.length === 0 || elements.length === 0 ? (
					<div className={styles.empty}>
						<p>Aucun blog à afficher</p>
					</div>
				) : (
					<div className={styles.container}>{elements}</div>
				)}
			</div>
		</div>
	);
};

export default Blogs;
