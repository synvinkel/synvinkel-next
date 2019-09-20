import dynamic from 'next/dynamic'
import withLayout from '../../components/Layout'
import Header from '../../components/Header'

const GLSLCanvas = dynamic(() => import('../../components/code/shaders'), {
    ssr: false
})

const Shaders = () => {

    const width = 400, height = 400

    return (
        <>
            {/* <Header /> */}
            <main>
                <p style={{ width: "100%"}}>
                    Working through <a href="https://thebookofshaders.com" target="_blank">Book of Shaders</a>
                </p>
                <div className="canvascontainer">
                    <GLSLCanvas
                        width={width} height={height}
                        fragment={`
                    #ifdef GL_ES
                    precision mediump float;
                    #endif
                    
                    uniform float u_time;
                    
                    void main() {
                        gl_FragColor = vec4(1.0,0.0,1.0,1.0);
                    }        
                    `}
                    />
                    <p>0001</p>
                </div>

                <div className="canvascontainer">
                    <GLSLCanvas
                        width={width} height={height}
                        fragment={`
                    #ifdef GL_ES
                    precision mediump float;
                    #endif
                    
                    uniform float u_time;

                    vec4 red(){
                        return vec4(1.0, 0.0, 0.0, 1.0);
                    }
                    
                    void main() {
                        gl_FragColor = red();
                    }        
                    `}
                    />
                    <p>0002</p>
                </div>

                <div className="canvascontainer">
                    <GLSLCanvas
                        width={width} height={height}
                        fragment={`
                    #ifdef GL_ES
                    precision mediump float;
                    #endif
                    
                    uniform float u_time;
                    
                    void main() {
                        gl_FragColor = vec4(abs(sin(u_time)), .0, .0, 1.0);
                    }        
                    `}
                    />
                    <p>0003</p>
                </div>

                <div className="canvascontainer">
                    <GLSLCanvas
                        width={width} height={height}
                        fragment={`
                    #ifdef GL_ES
                    precision mediump float;
                    #endif
                    
                    uniform float u_time;
                    
                    void main() {
                        gl_FragColor = vec4(
                            abs(sin(u_time * 0.1)),
                            abs(cos(u_time * 0.8)),
                            abs(sin(u_time * 2.0)),
                            1.0
                        );
                    }        
                    `}
                    />
                    <p>0004</p>
                </div>

                <div className="canvascontainer">
                    <GLSLCanvas
                        width={width} height={height}
                        fragment={`
                    #ifdef GL_ES
                    precision mediump float;
                    #endif
                    
                    uniform vec2 u_resolution;
                    uniform vec2 u_mouse;
                    uniform float u_time;

                    void main() {
                        vec2 st = gl_FragCoord.xy/u_resolution.xy;
                        gl_FragColor = vec4(
                            st.x,
                            st.y,
                            0.0,
                            1.0
                        );
                    }        
                    `}
                    />
                    <p>0005</p>

                </div>

                <div className="canvascontainer">
                    <GLSLCanvas
                        width={width} height={height}
                        fragment={`
                    #ifdef GL_ES
                    precision mediump float;
                    #endif
                    
                    uniform vec2 u_resolution;
                    uniform vec2 u_mouse;
                    uniform float u_time;

                    void main() {
                        vec2 st = gl_FragCoord.xy/u_mouse.xy;
                        gl_FragColor = vec4(
                            abs(sin(u_time) / st.x),
                            st.y,
                            st.x / st.y,
                            1.0
                        );
                    }        
                    `}
                    />
                    <p>0006</p>
                </div>

                <style jsx global>{`
body {
    padding: 0;
    margin: 0;
}
            `}</style>

                <style jsx>{`
main {
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    max-width: 1600px;
}

.canvascontainer {
    position: relative;
}
.canvascontainer p {
    font-size: 0.8rem;
}
                `}</style>
            </main>
        </>
    )
}

export default withLayout(Shaders, 'book of shaders')
