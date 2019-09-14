import { useState, useEffect, useRef } from 'react'
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from 'mapbox-gl'

function Map() {

    const [map, setMap] = useState(null);

    const ref = useRef(null);

    // Initialize map
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtbHVrZXNreSIsImEiOiJjamV0MW9rbTQwdjM2MnJvYnVmaTVwMTF4In0.865aEaV_zPu8st9-vXNeFg'
        const map = new mapboxgl.Map({
            container: ref.current,
            style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
            center: [18, 59],
            zoom: 10
        })

        map.on("load", () => {
            setMap(map)
        })

    }, [])

    return (
        <>
            <div className="Map" ref={el => (ref.current = el)} />
            <style jsx>{`
                .Map{
                    height: 100%;
                }
                `}</style>
        </>
    )

}

export default Map