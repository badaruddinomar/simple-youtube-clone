import React, { useCallback, useEffect, useState } from "react";
import { fetchFromApi } from "./../../utils/FetchFromApi";
import { useSelector } from "react-redux";
import Sidebar from "./../sidebar/Sidebar";
import Card from "../card/Card";
import ClipLoader from "react-spinners/ClipLoader";
import "./feed.css";

const Feed = () => {
  const { btnCategories } = useSelector((state) => state.custom);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  const fetchDataHandler = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchFromApi(
        `search?part=snippet&q=${btnCategories}`
      );
      const data = await response;
      setVideos(data.items);

      if (data.items) return setLoading(false);
    } catch (err) {
      setLoading(true);
    }
  }, [btnCategories]);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  return (
    <>
      <div className="feed">
        <Sidebar />
        <div className="cards">
          {loading ? (
            <ClipLoader color="white" className="clipLoader" />
          ) : (
            <Card videos={videos} />
          )}
        </div>
      </div>
    </>
  );
};

export default Feed;
