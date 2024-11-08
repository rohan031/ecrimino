import React from "react";
// import { gallery } from "@/data/gallery";
// import { storage } from "@/firebase/auth/auth";
// import { ref } from "firebase/storage";
import Album from "./Album";
import { LIMIT } from "@/data/helper";
import AlbumItem from "./album-list/AlbumItem";
import AlbumList from "./album-list/AlbumList";

export const revalidate = 60 * 60;

export interface Album {
	id: string;
	name: string;
	cover: string;
	createdAt: string;
}

const page = async () => {
	const url = `${process.env.NEXT_PUBLIC_API}/services/gallery/albums`;

	const albums: Album[] | null = await fetch(url, {
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

	if (!albums) {
		return (
			<>
				<div className="info-page__heading gallery">
					<h1>Gallery</h1>
				</div>

				<div
					className="container"
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

	if (albums.length === 0) {
		return (
			<>
				<div className="info-page__heading gallery">
					<h1>Gallery</h1>
				</div>

				<div
					className="container"
					style={{
						height: "20rem",
						display: "grid",
						placeItems: "center",
						color: "black",
					}}
				>
					<h4>There are no albums present.</h4>
				</div>
			</>
		);
	}

	const hasMore = albums.length === LIMIT;
	let len = albums.length;
	const cursor = albums[len - 1].createdAt;

	return (
		<>
			<div className="info-page__heading gallery">
				<h1>Gallery</h1>
			</div>

			<AlbumList url={url} cursor={cursor} hasMore={hasMore}>
				{albums.map((item) => {
					return <AlbumItem key={item.id} details={item} />;
				})}
			</AlbumList>
		</>
	);
};

export default page;
