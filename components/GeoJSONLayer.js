import { useEffect } from 'react'
import { useMap } from './Mapbox'

const GeoJSONLayer = ({ geojson }) => {

    const map = useMap()

    useEffect(() => {

        map.addSource("circle-source", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [],
            },
        })
        map.addLayer({
            id: "circle-layer",
            type: "circle",
            source: "circle-source",
            paint: {
                "circle-color": "red",
            },
        })

        return () => {
            map.removeLayer("circle-layer")
            map.removeSource("circle-source")
        }
    }, [])

    useEffect(() => {
        map.getSource("circle-source").setData(geojson)
    }, [geojson])

    return null
}

export default GeoJSONLayer