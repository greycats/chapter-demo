import React, { useCallback, useMemo, useRef } from "react";
import videojs from "video.js";
import Video from "./Video";
import "./index.css";
import $ from "jquery";

export default function Index() {
  const playerRef = useRef<any>(null);

  const videoJsOptions = useMemo(() => {
    let options: videojs.PlayerOptions = {
      controls: true,
      controlBar: {
        fullscreenToggle: false,
        pictureInPictureToggle: false,
      },
      bigPlayButton: false,
      autoplay: false,
      responsive: true,
      fluid: true,
      loop: false,
      muted: true,
      playbackRates: [1, 1.25, 1.5, 1.75, 2],
      html5: {
        nativeTextTracks: false,
      },
      poster: "https://assets.anyquestion.com/video/upload/so_0p/z7vdykf2auktylprpt7k.jpg",
      preload: "metadata",
      sources: [
        {
          src: "https://assets.anyquestion.com/video/upload/sp_mobile_default/z7vdykf2auktylprpt7k.m3u8",
          type: "application/x-mpegURL",
        },
      ],
      tracks: [
        // {
        //   src: "https://res.cloudinary.com/dzf7o8gft/raw/upload/v1695692176/z7vdykf2auktylprpt7k.vtt",
        //   kind: "captions",
        //   label: "English",
        //   default: true,
        // },
        {
          src: "./chapters.vtt",
          kind: "chapters",
          label: "English",
          default: true,
        },
      ],
    };

    return options;
  }, []);

  const handlePlayerReady = useCallback((player: any) => {
    playerRef.current = player;

    player.on("loadedmetadata", () => {
      const markers = [
        { time: 0, label: "Chapter 1" },
        { time: 5, label: "Chapter 2" },
        { time: 10, label: "Chapter 3" },
        { time: 20, label: "Chapter 4" },
        { time: 36, label: "Chapter 5" },
      ];

      const total = player.duration();

      const p = $(player.controlBar.progressControl.children_[0].el_);
      for (let i = 0; i < markers.length; i++) {
        const left = (markers[i].time / total) * 100 + "%";

        const time = markers[i].time;

        const el = $(
          '<div class="vjs-marker" style="left:' +
            left +
            '" data-time="' +
            time +
            '"><span>' +
            markers[i].label +
            "</span></div>"
        );
        el.click(function () {
          player.currentTime($(this).data("time"));
        });

        p.append(el);
      }
    });

    player.on("ended", () => {
      player.log("player is ended");
    });

    player.on("dispose", () => {
      player.log("player will dispose");
    });
  }, []);

  return (
    <div className='container'>
      <Video options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
}
