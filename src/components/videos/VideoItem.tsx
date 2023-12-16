import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface VideoItemProps {
	videoId: string;
}

export default function VideoItem({ videoId }: VideoItemProps) {
	return (
		<LiteYouTubeEmbed id={videoId} title="ecrimino youtube video player" />
	);
}
