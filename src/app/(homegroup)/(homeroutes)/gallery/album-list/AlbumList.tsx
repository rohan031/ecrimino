"use client";

import React, { useCallback, useRef, useState } from "react";
import { useIntersection } from "@/hooks/intersetion-observer/intersection-observer";

import styles from "./albumList.module.scss";
import AlbumItem from "./AlbumItem";
import { Album } from "../page";
import { LIMIT } from "@/data/helper";
import Loader from "@/components/loader/Loader";

interface AlbumListProps {
	children: React.ReactNode;
	hasMore: boolean;
	url: string;
	cursor: string;
}

const AlbumList = ({ children, hasMore, url, cursor }: AlbumListProps) => {
	const [moreAlbums, setMoreAlbums] = useState<Album[]>([]);
	const hasMoreRef = useRef<boolean>(hasMore);
	const cursorRef = useRef<string>(cursor);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchMoreAlbums = async () => {
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
				setMoreAlbums((prev) => {
					const newAlbums = res.data.filter(
						(album: Album) =>
							!prev.some(
								(exitingAlbum) => exitingAlbum.id === album.id
							)
					);
					return [...prev, ...newAlbums];
				});
			})
			.catch((err) => {
				console.error("can't fetch more albums");
			})
			.finally(() => setLoading(false));
	};

	const callback: IntersectionObserverCallback = useCallback(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					fetchMoreAlbums();
				}
			});
		},
		[]
	);

	const elementRef = useIntersection(callback);

	return (
		<>
			<div className={`${styles.container} container gallery-container`}>
				{children}

				{moreAlbums.map((item) => {
					return <AlbumItem key={item.id} details={item} />;
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

export default AlbumList;
