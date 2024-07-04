"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./blogId.module.scss";
import { useParams } from "next/navigation";
import Loader from "@/components/loader/Loader";
import "./blog.scss";
import SocialShare from "../../../../../components/socialShare/SocialShare";

export interface BlogItem {
	blogId: string;
	title: string;
	content: string;
	author: string;
	createdAt: string;
	updatedAt: string;
	cover: string;
}

const BlogItem = () => {
	const params = useParams<{ blogId: string }>();
	const [blogItem, setBlogItem] = useState<BlogItem | null>(null);
	const [loading, setLoading] = useState(true);

	const getBlogItem = useCallback(async () => {
		const url = `https://api.adgytec.in/v1/services/blog/${params.blogId}`;

		fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) throw new Error(res.message);

				setBlogItem(res.data);
			})
			.catch((err) => {
				console.error(err.message);
			})
			.finally(() => setLoading(false));
	}, [params]);

	useEffect(() => {
		getBlogItem();
	}, [getBlogItem]);

	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		);
	}

	if (!blogItem) {
		return (
			<div className={styles.loader}>
				<p>Blog not found</p>
			</div>
		);
	}

	let blogHTML = {
		__html: blogItem ? blogItem.content : "blog not found",
	};

	let createdAt = new Date();
	if (blogItem?.createdAt) {
		createdAt = new Date(blogItem.createdAt);
	}

	let updatedAt = new Date();
	if (blogItem?.updatedAt) {
		updatedAt = new Date(blogItem.updatedAt);
	}

	return (
		<div className={`container-blog ${styles.blog}`}>
			<div className={styles.main}>
				<h1>{blogItem.title}</h1>

				<p className={styles.meta}>
					<span className={styles.author}>{blogItem.author}</span>
					<span className={styles.date}>
						{createdAt.toDateString()}
					</span>
				</p>

				<div className={styles.image}>
					<img src={blogItem.cover} alt={blogItem.title} />
				</div>

				<SocialShare title={blogItem.title} />
			</div>

			<div
				className={styles.content}
				dangerouslySetInnerHTML={blogHTML}
			></div>

			<SocialShare title={blogItem.title} />
		</div>
	);
};

export default BlogItem;
