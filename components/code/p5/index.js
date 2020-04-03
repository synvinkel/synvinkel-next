import p5 from './p5.min.js'
import { useEffect, useRef } from 'react'

export default function useSketch(sketch) {

    const domRef = useRef(null)
    const P5Ref = useRef()

    useEffect(() => {
        domRef.current.style.width = "100%"
        domRef.current.style.height = "100%"
        P5Ref.current = new p5(sketch, domRef.current)
    }, [])

    return [domRef, P5Ref]
}