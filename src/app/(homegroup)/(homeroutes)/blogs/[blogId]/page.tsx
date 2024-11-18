import React from "react";
import styles from "./blogId.module.scss";
import "./blog.scss";
import SocialShare from "../../../../../components/socialShare/SocialShare";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export interface BlogItem {
	blogId: string;
	title: string;
	content: string;
	author: string;
	createdAt: string;
	updatedAt: string;
	cover: string;
}

export const revalidate = 60 * 60;

export const dynamicParams = true;

export async function generateStaticParams() {
	const url = `${process.env.NEXT_PUBLIC_API}/services/blogs`;

	const blogs = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
		},
	}).then((res) => res.json());

	if (blogs.error) {
		return [];
	}

	return blogs.data.blogs.map((blog: any) => {
		return {
			blogId: blog.blogId,
		};
	});
}

const BlogItem = async ({ params }: { params: { blogId: string } }) => {
	const url = `${process.env.NEXT_PUBLIC_API}/services/blog/${params.blogId}`;

	const blogItem: BlogItem | null = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
		},
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.error) throw new Error(res.message);
			return res.data;
		})
		.catch((err) => {
			console.error(err.message);
			return null;
		});

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
			<div className={styles.breadcrumb}>
				<Link href="/" className={styles.home}>
					Home
				</Link>
				<FontAwesomeIcon icon={faAngleRight} />
				<Link href="/blogs">Blogs</Link>
			</div>
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
