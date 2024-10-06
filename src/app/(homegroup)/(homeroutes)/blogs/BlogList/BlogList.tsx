"use client";

import React, { useCallback, useRef, useState } from "react";
import styles from "./blogList.module.scss";
import { useIntersection } from "@/hooks/intersetion-observer/intersection-observer";

import { LIMIT } from "@/data/helper";
import Loader from "@/components/loader/Loader";
import BlogItem from "../components/BlogItem/BlogItem";
import { Blog } from "../page";

interface BlogListProps {
	children: React.ReactNode;
	hasMore: boolean;
	url: string;
	cursor: string;
}

const BlogList = ({ children, hasMore, url, cursor }: BlogListProps) => {
	const [moreBlogs, setMoreblogs] = useState<Blog[]>([]);
	const hasMoreRef = useRef<boolean>(hasMore);
	const cursorRef = useRef<string>(cursor);

	const [loading, setLoading] = useState<boolean>(false);

	const fetchMoreBlogs = async () => {
		if (!hasMoreRef.current || loading) return;

		setLoading(true);

		let cursor = cursorRef.current;
		let token = process.env.NEXT_PUBLIC_TOKEN;
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		let cursorUrl = url + `?cursor=${cursor}`;

		fetch(cursorUrl, {
			method: "GET",
			headers,
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) throw new Error(res.message);
				let len = res.data.length;
				if (len < LIMIT) {
					hasMoreRef.current = false;
				}

				if (len <= 0) return;

				cursorRef.current = res.data[len - 1].createdAt;
				setMoreblogs((prev) => {
					const newBlogs = res.data.filter(
						(blog: Blog) =>
							!prev.some(
								(existingBlog) =>
									existingBlog.blogId === blog.blogId
							)
					);
					return [...prev, ...newBlogs];
				});
			})
			.catch((err) => {
				console.error("can't fetch more blogs");
			})
			.finally(() => setLoading(false));
	};

	const callback: IntersectionObserverCallback = useCallback(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					fetchMoreBlogs();
				}
			});
		},
		[]
	);

	const elementRef = useIntersection(callback);

	return (
		<>
			<div className={`${styles.container} container`}>
				{children}

				{moreBlogs.length > 0 &&
					moreBlogs.map((item) => {
						return <BlogItem key={item.blogId} blog={item} />;
					})}
				<div
					style={{
						visibility: "hidden",
					}}
					ref={elementRef}
				></div>
			</div>

			{loading && <Loader />}
		</>
	);
};

export default BlogList;
