import PodcastItem from '../components/PodcastItem';


export default function PodcastList({podcasts}) {
    return (
        <div className="podcast-list">
            {podcasts.length ? podcasts.map(podcast => <PodcastItem key={podcast._id} data={podcast} />) : 'No Podcasts Found'}
        </div>
    )
}
