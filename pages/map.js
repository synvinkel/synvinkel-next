import dynamic from 'next/dynamic'
import withLayout from '../components/Layout'

const DynamicMap = dynamic(() => import('../components/Map'), {
    loading: () => <p>Loading...</p>,
    ssr: false
})

const Map = () => (
    <div className="mapcontainer">
        <DynamicMap />
        <style jsx global>{`
body{
    margin: 0;
}

.mapcontainer {
    height: 100vh;
}
        `}</style>
    </div>
)

export default withLayout(Map)