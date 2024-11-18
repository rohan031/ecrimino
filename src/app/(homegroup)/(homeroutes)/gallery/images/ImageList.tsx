"use client";

import React, { useCallback, useRef, useState } from "react";
import styles from "./imageList.module.scss";
import { useIntersection } from "@/hooks/intersetion-observer/intersection-observer";
import { LIMIT, PageInfo } from "@/data/helper";
import { Photos } from "../[albumId]/page";
import Loader from "@/components/loader/Loader";

interface ImageListProps {
	children: React.ReactNode;
	pageInfo: PageInfo;
	url: string;
}

const ImageList = ({ children, url, pageInfo }: ImageListProps) => {
	const [morePhotos, setMorePhotos] = useState<Photos[][]>([]);
	const pageInfoRef = useRef<PageInfo>(pageInfo);

	const [loading, setLoading] = useState<boolean>(false);

	const fetchMoreImages = async () => {
		if (loading) return;
		if (!pageInfoRef.current.nextPage) return;

		setLoading(true);

		let cursor = pageInfoRef.current.cursor;
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
				pageInfoRef.current = res.data.pageInfo;
				setMorePhotos((prev) => {
					if (prev.length === 0) return [res.data.photos];

					return [...prev, res.data.photos];
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
