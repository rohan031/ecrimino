import React from "react";
// import { gallery } from "@/data/gallery";
// import { storage } from "@/firebase/auth/auth";
// import { ref } from "firebase/storage";
import Album from "./Album";
import { LIMIT } from "@/data/helper";
import AlbumItem from "./album-list/AlbumItem";
import AlbumList from "./album-list/AlbumList";

export const revalidate = 604800;

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

	const hasMore = albums.length === LIMIT;
	let len = albums.length;
	const cursor = albums[len - 1].createdAt;

	return (
		<>
			<div className="info-page__heading gallery">
				<h1>Gallery</h1>
			</div>

			{/* <div className="gallery-container">
				<div className="container">
					<div className="album-container">
                        {albums()}
                        </div>
				</div>
			</div> */}

			<AlbumList url={url} cursor={cursor} hasMore={hasMore}>
				{albums.map((item) => {
					return <AlbumItem key={item.id} details={item} />;
				})}
			</AlbumList>
		</>
	);
};

export default page;

// export default function Gallery() {
// 	const albums = () => {
// 		let elements = [];
// 		let len = gallery.length;
// 		for (let i = len; i >= 1; i--) {
// 			let galleryRef = ref(storage, `gallery/album${i}`);

// 			elements.push(
// 				<Album
// 					key={gallery[i]}
// 					galleryRef={galleryRef}
// 					albumCover={`/gallery/album${i}/cover.webp`}
// 					albumName={gallery[i - 1]}
// 				/>
// 			);
// 		}

// 		return elements;
// 	};

// 	return (
// 		<>
// 			<div className="info-page__heading gallery">
// 				<h1>Gallery</h1>
// 			</div>

// 			<div className="gallery-container">
// 				<div className="container">
// 					<div className="album-container">{albums()}</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// }
