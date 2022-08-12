import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { EpisodeProvider } from "./contexts/EpisodeContext";
import Navigation from "./layouts/Navigation";
import PodcastControls from "./components/PodcastControls";
import RoutesComp from "./components/RoutesComp";

export default function App() {

  return (
    <div className="App">
      <Router>
        <EpisodeProvider>
        <UserProvider>
          <Navigation/>
          <RoutesComp/>
          <PodcastControls/>
        </UserProvider>
        </EpisodeProvider>
      </Router>
    </div>
  );
}