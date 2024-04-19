"use client";

import React from "react";
import { gallery } from "@/data/gallery";
import { storage } from "@/firebase/auth/auth";
import { ref } from "firebase/storage";
import Album from "./Album";

export default function Gallery() {
	const albums = () => {
		let elements = [];
		let len = gallery.length;
		for (let i = len; i >= 1; i--) {
			let galleryRef = ref(storage, `gallery/album${i}`);

			elements.push(
				<Album
					key={gallery[i]}
					galleryRef={galleryRef}
					albumCover={`/gallery/album${i}/cover.webp`}
					albumName={gallery[i - 1]}
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
