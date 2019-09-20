import { useRef, useEffect, useState } from 'react'
import GlslCanvas from 'glslCanvas'


const GLSLCanvas = ({
    fragment,
    fragmentUrl,
    vertex,
    vertexUrl,
    textures,
    width,
    height
}) => {

    const [sandbox, setSandbox] = useState(null)
    const canvas = useRef(null)

    useEffect(() => {
        setSandbox(new GlslCanvas(canvas.current))
    }, [canvas])

    useEffect(() => {
        if (sandbox) sandbox.load(fragment)
    }, [sandbox])

    return (
        <>
            <canvas
                width={width || 400}
                height={height || 400}
                ref={canvas}
            />
        </>
    )
}

export default GLSLCanvas