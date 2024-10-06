"use client";

import React, { useCallback, useRef, useState } from "react";
import styles from "./imageList.module.scss";
import { useIntersection } from "@/hooks/intersetion-observer/intersection-observer";
import { LIMIT } from "@/data/helper";
import { Photos } from "../[albumId]/page";
import Loader from "@/components/loader/Loader";

interface ImageListProps {
	children: React.ReactNode;
	hasMore: boolean;
	url: string;
	cursor: string;
}

const ImageList = ({ children, hasMore, url, cursor }: ImageListProps) => {
	const [morePhotos, setMorePhotos] = useState<Photos[][]>([]);
	const hasMoreRef = useRef<boolean>(hasMore);
	const cursorRef = useRef<string>(cursor);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchMoreImages = async () => {
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
				setMorePhotos((prev) => {
					if (prev.length === 0) return [res.data];

					return [...prev, res.data];
				});
			})
			.catch((err) => {
				console.error("can't fetch more images");
			})
			.finally(() => setLoading(false));
	};

	const callback: IntersectionObserverCallback = useCallback(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					fetchMoreImages();
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

				{morePhotos.map((pictures, ind) => {
					return (
						<div key={`all-pictures${ind}${pictures.length}`}>
							{pictures.map((item) => {
								return (
									<a
										key={item.id}
										href={item.image}
										target="_blank"
									>
										<img src={item.image} alt="" />
									</a>
								);
							})}
						</div>
					);
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

export default ImageList;
