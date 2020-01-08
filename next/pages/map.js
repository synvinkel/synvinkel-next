import dynamic from 'next/dynamic'
import withLayout from '../components/Layout'
import Header from '../components/Header'

const Mapbox = dynamic(() => import('../components/Mapbox'), {
    loading: () => <p>Loading...</p>,
    ssr: false
})

const GeoJSONLayer = dynamic(() => import('../components/GeoJSONLayer'), {
    ssr: false
})

const Map = () => {

    return (
        <>
            <Header />
            <main>

                <div className="mapcontainer">
                    <Mapbox>
                        <GeoJSONLayer geojson={{ type: "Point", coordinates: [18, 59] }} />
                    </Mapbox>
                    <style jsx global>{
                        `
    body{
        margin: 0;
    }

    .mapcontainer {
        height: 70vh;
}
`
                    }</style>
                </div>
            </main>
        </>
    )
}

export default withLayout(Map)