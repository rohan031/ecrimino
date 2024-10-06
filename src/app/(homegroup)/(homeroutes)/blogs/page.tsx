import React from "react";
import styles from "./blogs.module.scss";
import Loader from "@/components/loader/Loader";
import BlogItem from "./components/BlogItem/BlogItem";
import { LIMIT } from "@/data/helper";
import BlogList from "./BlogList/BlogList";

export const revalidate = 604800;

export interface Blog {
	title: string;
	summary?: string;
	author: string;
	blogId: string;
	createdAt: string;
	cover: string;
}

const Blogs = async () => {
	const url = `${process.env.NEXT_PUBLIC_API}/services/blogs`;

	const blogs: Blog[] | null = await fetch(url, {
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

	if (!blogs) {
		return (
			<>
				<div
					style={{
						height: "20rem",
						display: "grid",
						placeItems: "center",
						color: "black",
					}}
				>
					<h4>Oops! Something went wrong.</h4>
				</div>
			</>
		);
	}

	const hasMore = blogs.length === LIMIT;
	let len = blogs.length;
	const cursor = blogs[len - 1].createdAt;

	return (
		<div className="container-blog">
			<div className={styles.blogs}>
				{blogs.length === 0 ? (
					<div className={styles.empty}>
						<p>Aucun blog à afficher</p>
					</div>
				) : (
					<BlogList hasMore={hasMore} url={url} cursor={cursor}>
						{blogs.map((item) => {
							return <BlogItem key={item.blogId} blog={item} />;
						})}
					</BlogList>
				)}
			</div>
		</div>
	);
};

export default Blogs;
