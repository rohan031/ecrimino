import React from "react";
import { Blog } from "../../page";
import styles from "./blogItem.module.scss";
import Link from "next/link";

interface BlogItemProps {
	blog: Blog;
}
const BlogItem = ({ blog }: BlogItemProps) => {
	let date = new Date(blog.createdAt);

	return (
		<div className={styles.blog}>
			<div className={styles.image}>
				<img src={blog.cover} alt={blog.title} />
			</div>

			<div className={styles.details}>
				<h2>{blog.title}</h2>

				<p className={styles.meta}>
					<span className={styles.author}>{blog.author}</span>
					<span className={styles.date}>{date.toDateString()}</span>
				</p>

				{blog.summary && (
					<p className={styles.summary}>
						{blog.summary.substring(0, 200) + "..."}
					</p>
				)}

				<div className={styles.link}>
					<Link href={`/blogs/${blog.blogId}`}>Lire plus</Link>
				</div>
			</div>
		</div>
	);
};

export default BlogItem;
