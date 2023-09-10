import React from "react";
import { Link } from "react-router-dom";
import "./channelCard.css";
import { demoThumbnailUrl } from "../../utils/constants";

export const ChannelCard = ({ item }) => {
  return (
    <>
      <div className="video-card">
        <div className="card">
          <Link className="wrapper-link" to={`/channel/${item?.id?.channelId}`}>
            <img
              src={item?.snippet?.thumbnails?.high?.url || demoThumbnailUrl}
              className="banner"
              alt="banner"
            />
          </Link>
        </div>
      </div>
    </>
  );
};
