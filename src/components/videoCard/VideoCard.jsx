import React from "react";
import { Link } from "react-router-dom";
import "./videoCard.css";
import { demoProfilePicture, demoThumbnailUrl } from "../../utils/constants";

const VideoCard = ({ item }) => {
  return (
    <>
      <div className="video-card">
        <Link className="link" to={`/video/${item?.id?.videoId}`}>
          <div className="image">
            <img
              src={item?.snippet?.thumbnails?.high?.url || demoThumbnailUrl}
              className="banner"
              alt="banner"
            />
          </div>

          <div className="card-details">
            <div className="logo">
              <img src={demoProfilePicture} alt="channel-logo" />
            </div>
            <div className="video-title">
              <h2>{item?.snippet?.description.slice(0, 60)}...</h2>
              <p>{item?.snippet?.channelTitle}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default VideoCard;
