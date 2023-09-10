import React, { useEffect, useState } from "react";
import { fetchFromApi } from "../utils/FetchFromApi";
import { useParams } from "react-router-dom";
import VideoCard from "../components/videoCard/VideoCard";
import { ChannelCard } from "../components/channelCard/ChannelCard";
import "./searchedVideo.css";
import ClipLoader from "react-spinners/ClipLoader";

const SeachedVideo = () => {
  const { query } = useParams();
  const [searchedVideo, setSearchedVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHandler = async () => {
      setLoading(true);
      const response = await fetchFromApi(
        `search?part=snippet,id&order=date&q=${query}`
      );
      const data = await response;
      setSearchedVideo(data.items);

      if (data.items) return setLoading(false);
    };
    fetchHandler();
  }, [query]);
  return (
    <>
      {loading ? (
        <div className="loader-div">
          <ClipLoader className="cliploader" color="white" />
        </div>
      ) : (
        <div className="searched-video">
          {searchedVideo.map((item, ind) => {
            return (
              <div key={ind}>
                {item?.id?.videoId && <VideoCard item={item} />}
                {item?.id?.channelId && <ChannelCard item={item} />}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SeachedVideo;
