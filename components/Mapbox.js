import { useState, useEffect, useRef, useContext, createContext } from 'react'
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from 'mapbox-gl'

const MapContext = createContext(undefined)
export const useMap = () => useContext(MapContext)

function Mapbox({ children }) {

    const mapRoot = useRef(undefined);
    const [map, setMap] = useState(undefined);

    // Initialize map
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtbHVrZXNreSIsImEiOiJjamV0MW9rbTQwdjM2MnJvYnVmaTVwMTF4In0.865aEaV_zPu8st9-vXNeFg'
        const map = new mapboxgl.Map({
            container: mapRoot.current,
            style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
            center: [18, 59],
            zoom: 10
        })

        map.on("load", () => {
            setMap(map)
        })

    }, [])

    return (
        <div
            className="Map"
            ref={mapRoot}
        >
            {map !== undefined && (
                <MapContext.Provider value={map}>
                    {children}
                </MapContext.Provider>
            )}
            <style jsx>{`
                .Map{
                    height: 100%;
                }
                `}</style>
        </div>
    )

}

export default Mapbox