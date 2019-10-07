import dynamic from 'next/dynamic'
import withLayout from '../components/Layout'
import Header from '../components/Header'

const DynamicMap = dynamic(() => import('../components/Mapbox'), {
    loading: () => <p>Loading...</p>,
    ssr: false
})

const Map = () => (
    <>
        <Header />
        <main>

            <div className="mapcontainer">
                <DynamicMap></DynamicMap>
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

export default withLayout(Map)