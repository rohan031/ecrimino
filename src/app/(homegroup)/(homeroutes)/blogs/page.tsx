import React from "react";
import styles from "./blogs.module.scss";
import Loader from "@/components/loader/Loader";
import BlogItem from "./components/BlogItem/BlogItem";
import { LIMIT, PageInfo } from "@/data/helper";
import BlogList from "./BlogList/BlogList";

export const revalidate = 60 * 60;

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
	let pageInfo: PageInfo = {
		nextPage: false,
		cursor: "",
	};

	const blogs: Blog[] | null = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
		},
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.error) throw new Error(res.message);
			pageInfo = res.data.pageInfo;
			return res.data.blogs;
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

	return (
		<div className="container-blog">
			<div className={styles.blogs}>
				{blogs.length === 0 ? (
					<div className={styles.empty}>
						<p>Aucun blog à afficher</p>
					</div>
				) : (
					<BlogList url={url} pageInfo={pageInfo}>
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
