"use client";

import React from "react";
import { gallery } from "@/data/gallery";
import { storage } from "@/firebase/auth/auth";
import { ref } from "firebase/storage";
import Album from "./Album";

export default function Gallery() {
	const albums = () => {
		let elements = [];
		for (let i = 1; i <= 7; i++) {
			let key = `album${i}`;
			let albumName = gallery[key as keyof typeof gallery];
			let galleryRef = ref(storage, `gallery/album${i}`);

			elements.push(
				<Album
					key={key}
					galleryRef={galleryRef}
					albumCover={`/gallery/album${i}/cover.WebP`}
					albumName={albumName}
				/>
			);
		}

		return elements;
	};

	return (
		<>
			<div className="info-page__heading gallery">
				<h1>Gallery</h1>
			</div>

			<div className="gallery-container">
				<div className="container">
					<div className="album-container">{albums()}</div>
				</div>
			</div>
		</>
	);
}
