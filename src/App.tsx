import { useState } from "react";
import "./App.css";
import ChaptersDemo from "./components/ChaptersDemo";

const SoucresList = [
  {
    id: 7,
    videoUrl:
      "https://d3kzbcfhipx62u.cloudfront.net/cf478d09-54b6-4d47-809a-819fbaa9e60d/hls/7.m3u8",
    chapterName: "chapters_7.vtt",
  },
  {
    id: 8,
    videoUrl:
      "https://d3kzbcfhipx62u.cloudfront.net/f6f69d7e-4b82-46af-b850-4398b99545ef/hls/8.m3u8",
    chapterName: "chapters_8.vtt",
  },
  {
    id: 9,
    videoUrl:
      "https://d3kzbcfhipx62u.cloudfront.net/bd0c99be-3f86-41a2-a8f6-c7ad0c30a8b4/hls/9.m3u8",
    chapterName: "chapters_9.vtt",
  },
  {
    id: 10,
    videoUrl:
      "https://d3kzbcfhipx62u.cloudfront.net/94ad2a91-e492-4b28-b70d-a25ff8e48668/hls/10.m3u8",
    chapterName: "chapters_10.vtt",
  },
  {
    id: 11,
    videoUrl:
      "https://d3kzbcfhipx62u.cloudfront.net/08c62716-37da-46d7-85bc-a73ebc3a4892/hls/11.m3u8",
    chapterName: "chapters_11.vtt",
  },
  {
    id: 37,
    videoUrl:
      "https://d3kzbcfhipx62u.cloudfront.net/2f3f1c05-7427-4a9d-842d-89d41a7bf13f/hls/37.m3u8",
    chapterName: "chapters_37.vtt",
  },
  {
    id: 38,
    videoUrl:
      "https://d3kzbcfhipx62u.cloudfront.net/470966c9-7efe-427c-ab5e-9bb263612f53/hls/38.m3u8",
    chapterName: "chapters_38.vtt",
  },
  {
    id: 44,
    videoUrl:
      "https://d3kzbcfhipx62u.cloudfront.net/193df6af-8351-4652-b8dc-b3d1fa73aef0/hls/44.m3u8",
    chapterName: "chapters_44.vtt",
  },
  {
    id: 45,
    videoUrl:
      "https://d3kzbcfhipx62u.cloudfront.net/5c9ea405-cdec-4b3f-81c5-cccb9ab64a93/hls/45.m3u8",
    chapterName: "chapters_45.vtt",
  },
  {
    id: 59,
    videoUrl:
      "https://d3kzbcfhipx62u.cloudfront.net/f004f164-751f-47d4-8c71-7d7991c55638/hls/59.m3u8",
    chapterName: "chapters_59.vtt",
  },
];

function App() {
  const [selectedId, setSelectedId] = useState(SoucresList[0].id);

  return (
    <div className='App'>
      <div className='left-section'>
        {SoucresList.map(({ id }, index) => (
          <div
            key={index}
            className={`nav-item ${selectedId === id ? "active" : ""}`}
            onClick={() => setSelectedId(id)}
          >{`Video - ${id}`}</div>
        ))}
      </div>
      <div className='right-section'>
        {SoucresList.map((item) =>
          item.id === selectedId ? <ChaptersDemo {...item} key={item.id} /> : null
        )}
      </div>
    </div>
  );
}

export default App;
