"use client";

import React, { useCallback, useRef, useState } from "react";
import { useIntersection } from "@/hooks/intersetion-observer/intersection-observer";

import styles from "./albumList.module.scss";
import AlbumItem from "./AlbumItem";
import { Album } from "../page";
import { LIMIT, PageInfo } from "@/data/helper";
import Loader from "@/components/loader/Loader";

interface AlbumListProps {
	children: React.ReactNode;
	url: string;
	pageInfo: PageInfo;
}

const AlbumList = ({ children, url, pageInfo }: AlbumListProps) => {
	const [moreAlbums, setMoreAlbums] = useState<Album[]>([]);
	const pageInfoRef = useRef<PageInfo>(pageInfo);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchMoreAlbums = async () => {
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
				setMoreAlbums((prev) => {
					const newAlbums = res.data.albums.filter(
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
