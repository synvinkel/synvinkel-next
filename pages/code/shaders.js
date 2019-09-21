import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import withLayout from '../../components/Layout'
import Header from '../../components/Header'

const GLSLCanvas = dynamic(() => import('../../components/code/shaders'), {
    ssr: false,
    loading: () => null
})

const Shaders = () => {

    const width = 400, height = 400

    // just to see the latest one while developing
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight)
        }, 1000)
    })

    return (
        <>
            {/* <Header /> */}
            <main>
                <p style={{ width: "100%" }}>
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

                    float plot(vec2 st, float pct){
                        return  smoothstep(pct-0.02, pct, st.y) -
                                smoothstep(pct, pct+0.02, st.y);
                    }
                    void main() {
                        vec2 st = gl_FragCoord.xy/u_resolution;

                        float y = st.x;

                        vec3 color = vec3(y);

                        float pct = plot(st, y);
                        color = (1.0-pct)*color+pct*vec3(0.0, 1.0, 0.0);
                        
                        gl_FragColor = vec4(color, 1.0);
                    }        
                    `}
                    />
                    <p>0007</p>
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

                    float plot(vec2 st, float pct){
                        return  smoothstep(pct-0.02, pct, st.y) -
                                smoothstep(pct, pct+0.02, st.y);
                    }
                    void main() {
                        vec2 st = gl_FragCoord.xy/u_resolution;

                        float y = pow(st.x, 5.0);

                        vec3 color = vec3(y);

                        float pct = plot(st, y);
                        color = (1.0-pct)*color+pct*vec3(0.0, 1.0, 0.0);
                        
                        gl_FragColor = vec4(color, 1.0);
                    }        
                    `}
                    />
                    <p>0008</p>
                </div>

                <div className="canvascontainer">
                    <GLSLCanvas
                        width={width} height={height}
                        fragment={`
                            #ifdef GL_ES
                            precision mediump float;
                            #endif

                            #define PI 3.14159265359

                            uniform vec2 u_resolution;
                            uniform vec2 u_mouse;
                            uniform float u_time;
        
                            float plot(vec2 st, float pct){
                                return  smoothstep(pct-0.02, pct, st.y) -
                                        smoothstep(pct, pct+0.02, st.y);
                            }
                            void main() {
                                vec2 st = gl_FragCoord.xy/u_resolution;
        
                                float y = sqrt(st.x / PI * 2.0);
        
                                vec3 color = vec3(y);
        
                                float pct = plot(st, y);
                                color = (1.0-pct)*color+pct*vec3(0.0, 1.0, 0.0);
                                
                                gl_FragColor = vec4(color, 1.0);
                            }             
                        `}
                    />
                    <p>0009</p>
                </div>

                <div className="canvascontainer">
                    <GLSLCanvas
                        width={width} height={height}
                        fragment={`
                            #ifdef GL_ES
                            precision mediump float;
                            #endif

                            #define PI 3.14159265359

                            uniform vec2 u_resolution;
                            uniform vec2 u_mouse;
                            uniform float u_time;
        
                            float plot(vec2 st, float pct){
                                return  smoothstep(pct-0.02, pct, st.y) -
                                        smoothstep(pct, pct+0.02, st.y);
                            }
                            void main() {
                                vec2 st = gl_FragCoord.xy/u_resolution;
        
                                float y = pow(st.x, 0.2 + sin(u_time*2.0)+1.0 + sin(u_time*2.0)+1.0);
        
                                vec3 color = vec3(y);
        
                                float pct = plot(st, y);
                                color = (1.0-pct)*color+pct*vec3(0.0, 1.0, 0.0);
                                
                                gl_FragColor = vec4(color, 1.0);
                            }             
                        `}
                    />
                    <p>0010</p>
                </div>
                <div className="canvascontainer">
                    <GLSLCanvas
                        width={width} height={height}
                        fragment={`
                            #ifdef GL_ES
                            precision mediump float;
                            #endif

                            #define PI 3.14159265359

                            uniform vec2 u_resolution;
                            uniform float u_time;
        
                            float plot(vec2 st, float pct){
                                return  smoothstep(pct-0.02, pct, st.y) -
                                        smoothstep(pct, pct+0.02, st.y);
                            }
                            void main() {
                                vec2 st = gl_FragCoord.xy/u_resolution;

                                float y = step((sin(u_time)+1.0)*.5, st.x);

                                vec3 color = vec3(y);

                                float pct = plot(st,y);
                                color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

                                gl_FragColor = vec4(color, 1.0);
                            }             
                        `}
                    />
                    <p>0011</p>
                </div>
                <div className="canvascontainer">
                    <GLSLCanvas
                        width={width} height={height}
                        fragment={`
                            #ifdef GL_ES
                            precision mediump float;
                            #endif

                            #define PI 3.14159265359

                            uniform vec2 u_resolution;
                            uniform float u_time;
        
                            float plot(vec2 st, float pct){
                                return  smoothstep(pct-0.02, pct, st.y) -
                                        smoothstep(pct, pct+0.02, st.y);
                            }
                            void main() {
                                vec2 st = gl_FragCoord.xy/u_resolution;

                                float y = smoothstep(0.3, 0.5, st.x) - smoothstep(0.5, 0.7, st.x);

                                vec3 color = vec3(y);

                                float pct = plot(st,y);
                                color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

                                gl_FragColor = vec4(color, 1.0);
                            }             
                        `}
                    />
                    <p>0012</p>
                </div>
                <div className="canvascontainer">
                    <GLSLCanvas
                        width={width} height={height}
                        fragment={`
                            #ifdef GL_ES
                            precision mediump float;
                            #endif

                            #define PI 3.14159265359

                            uniform vec2 u_resolution;
                            uniform float u_time;
        
                            float plot(vec2 st, float pct){
                                return  smoothstep(pct-0.02, pct, st.y) -
                                        smoothstep(pct, pct+0.02, st.y);
                            }
                            void main() {
                                vec2 st = gl_FragCoord.xy/u_resolution;

                                float y = step(0.49, st.x) - step(0.51, st.x);

                                vec3 color = vec3(y);

                                float pct = plot(st,y);
                                color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

                                gl_FragColor = vec4(color, 1.0);
                            }             
                        `}
                    />
                    <p>0013</p>
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
