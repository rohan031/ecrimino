"use client";

import React, { useState, useEffect, useRef } from "react";
import {
	listAll,
	getDownloadURL,
	StorageReference,
	ListResult,
} from "firebase/storage";
import Loader from "@/components/loader/Loader";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface AlbumProps {
	galleryRef: StorageReference;
	albumName: string;
	albumCover: string;
}

export default function Album({
	galleryRef,
	albumCover,
	albumName,
}: AlbumProps) {
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [open, setOpen] = useState(false);
	const onceRef = useRef(false);
	const imagesRef = useRef<ListResult>();
	const [loading, setLoading] = useState(true);

	const fetchImages = async () => {
		try {
			const images = imagesRef.current;
			if (!images) return;

			const startIndex = (page - 1) * 10;
			const endIndex = startIndex + 10;

			if (startIndex >= images.items.length) {
				setHasMore(false);
				setLoading(false);
				return;
			}

			const urls = await Promise.all(
				images.items
					.slice(startIndex, endIndex)
					.map(async (imageRef) => await getDownloadURL(imageRef))
			);

			setImageUrls((prevUrls) => [...prevUrls, ...urls]);
			setPage((prevPage) => prevPage + 1);

			setTimeout(() => {
				setLoading(false);
			}, 2000);
		} catch (error) {
			console.error("Error fetching images:", error);
		}
	};

	useEffect(() => {
		if (onceRef.current) return;

		const inititalFetch = async () => {
			try {
				imagesRef.current = await listAll(galleryRef);
				fetchImages();
			} catch (error) {
				console.log("Eror fetching images: ", error);
			}
		};

		if (page === 1) {
			inititalFetch();
		}
		onceRef.current = true;
	}, []);

	const handleCloseModal = () => {
		setOpen(false);
		document.body.style.overflow = "auto";
	};

	const handleOpenModal = () => {
		setOpen(true);

		document.body.style.overflow = "hidden";
	};

	const loadMoreImages = () => {
		setLoading(true);
		fetchImages();
	};

	const handleImage = (url: string) => {
		window.open(url, "_blank");
	};

	return (
		<div className="album">
			<div className="album-details" onClick={handleOpenModal}>
				<Image
					src={albumCover}
					alt={albumName}
					width="864"
					height="575"
				/>

				<p>{albumName.toLowerCase()}</p>
			</div>

			<Modal
				isOpen={open}
				contentLabel={`${albumName} images`}
				onRequestClose={handleCloseModal}
				shouldCloseOnOverlayClick={true}
				onAfterClose={() => {
					document.body.style.overflow = "auto";
				}}
				preventScroll={true}
				style={{
					overlay: {
						zIndex: "2",
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						backdropFilter: "blur(0.1em)",
					},
					content: {
						borderRadius: "0.75em",
						backgroundColor: "#fbfcf8",
						inset: "1rem",
					},
				}}
				ariaHideApp={false}
			>
				<div className="album-modal">
					<button
						onClick={handleCloseModal}
						className="album-modal__close"
					>
						<FontAwesomeIcon icon={faXmark} />
					</button>

					<div className="album-images">
						{imageUrls.map((url, index) => (
							<img
								key={index}
								loading="lazy"
								src={url}
								onClick={() => handleImage(url)}
								alt="gallery image"
								width="607"
								height="404"
							/>
						))}
					</div>

					{loading && <Loader />}

					{hasMore && !loading && (
						<button
							className="album-modal__load"
							onClick={loadMoreImages}
						>
							Load More
						</button>
					)}
				</div>
			</Modal>
		</div>
	);
}
