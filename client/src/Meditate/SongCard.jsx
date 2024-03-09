import React from "react";
import AlbumImage from "./AlbumImage";
import AlbumInfo from "./AlbumInfo";
import "./SongCard.css";

export default function SongCard({ album }) {
  return (
    <div className="songCard-body flex">
      <AlbumImage url={album?.images[0]?.url} />
      <AlbumInfo album={album} />
    </div>
  );
}
