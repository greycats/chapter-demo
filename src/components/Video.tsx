import React, { useEffect, useRef } from "react";
import videojs from "video.js";

type Props = {
  options: videojs.PlayerOptions;
  onReady: (player: videojs.Player) => void;
};

export default function Index({ options, onReady }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;
      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));
    }
  }, [onReady, options]);

  return <video ref={videoRef} className='video-js' />;
}
