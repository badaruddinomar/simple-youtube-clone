import React, { useEffect, useState } from "react";
import { fetchFromApi } from "../../utils/FetchFromApi";
import { Link, useParams } from "react-router-dom";
import "./channelDetail.css";
import ClipLoader from "react-spinners/ClipLoader";
import { demoProfilePicture, demoThumbnailUrl } from "../../utils/constants";

const ChannelDetail = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState("");
  const [channelVideos, setChannelVedeos] = useState([]);

  useEffect(() => {
    const fetchHandler = async () => {
      setLoading(true);
      const response = await fetchFromApi(
        `channels?part=snippet,statistics&id=${id}`
      );
      const data = await response;
      setChannelDetail(data.items[0]);
      //
      const response1 = await fetchFromApi(
        `search?part=snippet,id&channelId=${id}&order=date`
      );
      const data1 = await response1;
      setChannelVedeos(data1.items);

      if (data.items[0] && data1.items) return setLoading(false);
    };
    fetchHandler();
  }, [id]);
  return (
    <>
      {loading ? (
        <div className="loader-div">
          <ClipLoader color="white" className="cliploader" />
        </div>
      ) : (
        <div className="channel-detail">
          <div className="banner">
            <img
              src={
                channelDetail?.brandingSettings?.image?.bannerExternalUrl ||
                demoThumbnailUrl
              }
              alt="channel-banner"
            />
          </div>
          <div className="channel-info">
            <div className="logo">
              <img
                src={
                  channelDetail?.snippet?.thumbnails?.high?.url ||
                  demoProfilePicture
                }
                alt="logo"
                width={"300px"}
              />
            </div>
            <div className="desc">
              <h2 className="channel-name">
                {channelDetail?.brandingSettings?.channel?.title}
              </h2>
              <p className="channel-desc">
                {channelDetail?.brandingSettings?.channel?.description}
              </p>
            </div>
          </div>
          <div className="channel-videos">
            {channelVideos.map((video, ind) => {
              return (
                <div
                  key={ind}
                  className="video-card"
                  style={{ cursor: "pointer" }}
                >
                  <Link
                    className="wrapper-link"
                    to={`/video/${video?.id?.videoId}`}
                  >
                    <div className="video-image">
                      <img
                        src={video?.snippet?.thumbnails?.high?.url}
                        alt="video"
                      />
                    </div>
                    <div className="video-desc">
                      <h2>{video?.snippet?.description.slice(0, 60)}...</h2>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ChannelDetail;
