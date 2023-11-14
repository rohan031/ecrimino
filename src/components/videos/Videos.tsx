"use client";

import React, { useEffect, useState } from "react";
import VideoItem from "./VideoItem";

type Data = string[];
type APIRes = { items: { id: { videoId: string } }[] };

export default function Videos() {
	const [data, setData] = useState<Data>();
	const [err, setErr] = useState(false);

	useEffect(() => {
		fetch(
			`https://www.googleapis.com/youtube/v3/search?part=id&channelId=${process.env.NEXT_PUBLIC_CHANNEL_ID}&order=date&maxResults=3&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
		)
			.then((res) => {
				if (!res.ok) {
					setErr(true);
					throw new Error("Can't fetch videos");
				}
				return res.json();
			})
			.then((res: APIRes) => {
				setErr(false);
				let ids = res.items.map((item) => item.id.videoId);
				setData(ids);
			})
			.catch((err: Error) => {
				setErr(true);
			});
	}, []);

	if (err) {
		return (
			<p>
				Can&apos;t fetch youtube videos!! Visit our channel on Youtube.
			</p>
		);
	}

	const videos = data?.map((id) => {
		return <VideoItem key={id} videoId={id} />;
	});

	return <div className="videos">{videos}</div>;
}
