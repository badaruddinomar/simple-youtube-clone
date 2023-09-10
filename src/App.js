import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/feed/Feed";
import VideoDetail from "./components/viedeoDetail/VideoDetail";
import ChannelDetail from "./components/channelDetail/ChannelDetail";
import SeachedVideo from "./searchedVideo/SeachedVideo";
import Layout from "./Layout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/channel/:id" element={<ChannelDetail />} />
            <Route path="/search/:query" element={<SeachedVideo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
