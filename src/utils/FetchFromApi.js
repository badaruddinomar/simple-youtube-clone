const axios = require("axios");

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  url: BASE_URL,
  params: {
    maxResults: "50",
    // q: "music",
    // part: "snippet,id",
    // regionCode: "US",
    // order: "date",
  },
  headers: {
    "X-RapidAPI-Key": "e80c60f4c4mshd2d7bc16ef86715p1f6cdajsnb235d6ff7954",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromApi = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
