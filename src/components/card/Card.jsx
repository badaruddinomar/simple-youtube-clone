import React from "react";
import VideoCard from "../videoCard/VideoCard";
import { ChannelCard } from "../channelCard/ChannelCard";
import "./card.css";

const Card = ({ videos }) => {
  return (
    <>
      <div className="card">
        {videos.map((item, ind) => {
          return (
            <div className="feed-card" key={ind}>
              {item?.id?.videoId && <VideoCard item={item} />}
              {item?.id?.channelId && <ChannelCard item={item} />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;
