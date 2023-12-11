import React from "react";

interface VideoItemProps {
	videoId: string;
}

export default function VideoItem({ videoId }: VideoItemProps) {
	return (
		<iframe
			className="videos-item"
			// width="560"
			// height="315"
			src={`https://www.youtube.com/embed/${videoId}`}
			title="YouTube video player"
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowFullScreen
		></iframe>
	);
}
