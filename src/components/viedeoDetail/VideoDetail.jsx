import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { fetchFromApi } from "../../utils/FetchFromApi";
import "./videoDetail.css";
import { demoThumbnailUrl } from "../../utils/constants";
import ClipLoader from "react-spinners/ClipLoader";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [channelDetail, setChannelDetail] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const channelId = videoDetail?.snippet?.channelId;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        setLoading(true);
        const response1 = await fetchFromApi(
          `videos?part=snippet,statistics&id=${id}`
        );
        const data1 = await response1;
        setVideoDetail(data1.items[0]);

        const response2 = await fetchFromApi(
          `search?part=snippet&relatedToVideoId=${id}&type=video`
        );
        const data2 = await response2;
        setVideos(data2.items);

        const response3 = await fetchFromApi(
          `channels?part=snippet,statistics&id=${channelId}`
        );
        const data3 = await response3;

        setChannelDetail(data3.items[0]);

        if (data1.items[0] && data2.items && data3.items[0])
          return setLoading(false);
      } catch (err) {}
    };
    fetchHandler();
  }, [id, channelId]);

  return (
    <>
      <div className="videoDetail">
        {loading ? (
          <div className="loader-div">
            <ClipLoader color="white" className="cliploader" />
          </div>
        ) : (
          <div className="play-video">
            <ReactPlayer
              className="react-player"
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width={"100%"}
              height={"500px"}
            />
            <h2 className="video-title">{videoDetail?.snippet?.title}</h2>
            <Link
              className="link"
              to={`/channel/${videoDetail?.snippet?.channelId}`}
            >
              <div className="video-desc">
                <div className="channel-logo">
                  <img
                    src={
                      channelDetail?.snippet?.thumbnails?.high?.url ||
                      demoThumbnailUrl
                    }
                    alt="logo"
                  />
                </div>
                <div className="video-title">
                  <h3>{channelDetail?.brandingSettings?.channel?.title}</h3>
                  <p>
                    {channelDetail?.statistics?.subscriberCount} subscribers
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="related-videos">
          {videos.map((item, ind) => {
            return (
              <Link
                className="wrapper-link"
                key={ind}
                to={`/video/${item?.id?.videoId}`}
              >
                <img
                  src={item?.snippet?.thumbnails?.high?.url || demoThumbnailUrl}
                  alt="related-video"
                />
                <div className="title">
                  <h2>{item?.snippet?.title.slice(0, 60)}...</h2>
                  <p>{item?.snippet?.channelTitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
