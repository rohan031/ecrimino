"use client";

import React from "react";
import { gallery } from "@/data/gallery";
import { storage } from "@/firebase/auth/auth";
import { ref, StorageReference } from "firebase/storage";
import Album from "./Album";

export default function Gallery() {
	let album1Ref = ref(storage, "gallery/album1");
	let album2Ref = ref(storage, "gallery/album2");
	let album3Ref = ref(storage, "gallery/album3");

	return (
		<>
			<div className="info-page__heading gallery">
				<h1>Gallery</h1>
			</div>

			<div className="gallery-container">
				<div className="container">
					<div className="album-container">
						<Album
							galleryRef={album1Ref}
							albumCover="/gallery/album1/cover.WebP"
							albumName={gallery.album1}
						/>

						<Album
							galleryRef={album2Ref}
							albumCover="/gallery/album2/cover.WebP"
							albumName={gallery.album2}
						/>

						<Album
							galleryRef={album3Ref}
							albumCover="/gallery/album3/cover.WebP"
							albumName={gallery.album3}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
