import React from "react";
import { Album } from "../page";
import { LIMIT, PageInfo } from "@/data/helper";
import ImageList from "../images/ImageList";

export const revalidate = 60 * 60;

export const dynamicParams = true;

export async function generateStaticParams() {
	const url = `${process.env.NEXT_PUBLIC_API}/services/gallery/albums`;

	const albums = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
		},
	}).then((res) => res.json());

	if (albums.error || !albums) {
		return [];
	}

	return albums.data.albums.map((album: Album) => {
		return {
			albumId: album.id,
		};
	});
}

export interface Photos {
	id: string;
	image: string;
	createdAt: string;
}

const page = async ({ params }: { params: { albumId: string } }) => {
	const url = `${process.env.NEXT_PUBLIC_API}/services/gallery/album/${params.albumId}`;
	const nameUrl = `${process.env.NEXT_PUBLIC_API}/services/gallery/album/${params.albumId}/name`;

	let pageInfo: PageInfo = {
		nextPage: false,
		cursor: "",
	};
	const photosPromise = fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
		},
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.error) throw new Error(res.message);
			pageInfo = res.data.pageInfo;
			return res.data.photos;
		});
	const namePromise = fetch(nameUrl, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
		},
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.error) throw new Error(res.message);
			return res.data;
		});

	const [photosResult, nameResult] = await Promise.allSettled([
		photosPromise,
		namePromise,
	]);

	const photos: Photos[] | null =
		photosResult.status === "fulfilled" ? photosResult.value : null;

	const name: string | null =
		nameResult.status === "fulfilled" ? nameResult.value : null;

	if (!photos) {
		return (
			<>
				<div className="info-page__heading gallery">
					<h1 className="container">{name ?? ""}</h1>
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

	if (photos.length === 0) {
		<>
			<div className="info-page__heading gallery">
				<h1 className="container">{name ?? ""}</h1>
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
				<h4>There are no photos present.</h4>
			</div>
		</>;
	}

	return (
		<>
			<div
				className="info-page__heading"
				style={{
					backgroundImage: `linear-gradient(
                        rgba(0, 0, 0, 0.8),
                        rgba(0, 0, 0, 0.4)
                    ),
                    url(${photos[0].image ?? ""})`,
					backgroundPosition: "center 25%",
				}}
			>
				<h1 className="container">{name ?? ""}</h1>
			</div>

			<ImageList pageInfo={pageInfo} url={url}>
				<div>
					{photos.map((item) => {
						return (
							<a key={item.id} href={item.image} target="_blank">
								<img src={item.image} alt="" />
							</a>
						);
					})}
				</div>
			</ImageList>
		</>
	);
};

export default page;
