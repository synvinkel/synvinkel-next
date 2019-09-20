import dynamic from 'next/dynamic'

const GLSLCanvas = dynamic(() => import('../../components/code/shaders'), {
    ssr: false
})

const Shaders = () => {

    return (
        <>
            <GLSLCanvas
                fragment={`
                    #ifdef GL_ES
                    precision mediump float;
                    #endif

                    uniform float u_time;

                    void main() {
                        gl_FragColor = vec4(0.0,1.0,1.0,1.0);
                    }        
                `}
            />

            <style jsx global>{`
body {
    padding: 0;
    margin: 0;
}
            `}</style>
        </>
    )
}

export default Shaders
