import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import Home from "./pages/Home";
import Podcast from "./pages/Podcast";
import Search from "./pages/Search";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/podcast" element={<Podcast/>} />
        </Routes>
      </Router>
    </div>
  );
}