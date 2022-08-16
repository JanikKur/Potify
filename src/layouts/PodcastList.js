import PodcastItem from '../components/PodcastItem';
import '../assets/styles/layouts/podcastList.css';

export default function PodcastList({podcasts}) {
    
    return (
        <div className="podcast-list">
            {podcasts.length ? podcasts.map(podcast => <PodcastItem key={podcast._id} data={podcast} />) : 'No Podcasts Found'}
        </div>
    )
}
