import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { EpisodeProvider } from "./contexts/EpisodeContext";
import Navigation from "./layouts/Navigation";
import AddEpisode from "./pages/AddEpisode";
import AddPodcast from "./pages/AddPodcast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPodcasts from "./pages/MyPodcasts";
import NotFound from "./pages/NotFound";
import Podcast from "./pages/Podcast";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import PodcastControls from "./components/PodcastControls";

export default function App() {
  return (
    <div className="App">
      <Router>
        <EpisodeProvider>
        <UserProvider>
          <Navigation/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/podcast" element={<Podcast/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/mypodcasts" element={<MyPodcasts/>} />
            <Route path="/addpodcast" element={<AddPodcast/>} />
            <Route path="/addepisode" element={<AddEpisode/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
          <PodcastControls/>
        </UserProvider>
        </EpisodeProvider>
      </Router>
    </div>
  );
}