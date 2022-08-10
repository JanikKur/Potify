import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import Home from "./pages/Home";
import Podcast from "./pages/Podcast";
import Search from "./pages/Search";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/podcast" element={<Podcast/>} />
          <Route path="/settings" element={<Settings/>} />
        </Routes>
      </Router>
    </div>
  );
}