import React from "react";
import VideoItem from "./VideoItem";

export default async function Videos() {
	let CHANNEL_ID = "UC4514FwdRy5gI6CdC9GPb0w";
	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/search?part=id&channelId=${CHANNEL_ID}&order=date&maxResults=3&type=video&key=${process.env.YOUTUBE_API_KEY}`
	);

	if (!response.ok) {
		const data = await response.json();
		console.log(data);
		return (
			<p>
				Can&apos;t fetch youtube videos!! Visit our channel on Youtube.
			</p>
		);
	}
	const data: { items: { id: { videoId: string } }[] } =
		await response.json();

	const videos = data.items.map((item) => {
		return <VideoItem key={item.id.videoId} videoId={item.id.videoId} />;
	});

	return <div className="videos">{videos}</div>;
}
