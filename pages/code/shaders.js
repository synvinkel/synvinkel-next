import dynamic from 'next/dynamic'
import { useState } from 'react'

import withLayout from '../../components/Layout'

const fragments = [
    `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform float u_time;
    
    void main() {
        gl_FragColor = vec4(1.0,0.0,1.0,1.0);
    }        
    `,
    `
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
    `,
    `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform float u_time;
    
    void main() {
        gl_FragColor = vec4(abs(sin(u_time)), .0, .0, 1.0);
    }        
    `,
    `
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
    `,
    `
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
    `,
    `
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
    `,
    `
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
    `,
    `
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
    `,
    `
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
    `,
    `
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
    `,
    `
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
    `,
    `
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
    `,
    `
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
    `,
    // fence painting
    `
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
        
        // float y = ;
        float y = 1.0 - pow(abs(st.x -0.5), 0.5);
        // float y = 1.0 - pow(abs(st.x - .5), 1.0);
        // float y = 1.0 - pow(abs(st.x-.5), 1.5);
        // float y = 1.0 - pow(abs(st.x-.5), 1.5);

        vec3 color = vec3(y);

        float pct = plot(st, y);
        color = (1.0-pct)*color+pct*vec3(0.0, 1.0, 0.0);
        
        gl_FragColor = vec4(color, 1.0);
    }        
    `,
    // Color mixing with mix()
    `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform vec2 u_resolution;
    uniform float u_time;

    vec3 colorA = vec3(0.31,0.75,0.8);
    vec3 colorB = vec3(0.8,0.31,0.64);
  
    void main(){
        vec3 color = vec3(0.0);

        float pct = (sin(u_time)+1.0)/2.0;

        color = mix(colorA, colorB, pct);

        gl_FragColor = vec4(color, 1.0);
    }
    `,
    // Color mixing with shaping function
    `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform vec2 u_resolution;
    uniform float u_time;

    vec3 colorA = vec3(0.31,0.75,0.8);
    vec3 colorB = vec3(0.8,0.31,0.64);
  
    void main(){
        vec3 color = vec3(0.0);

        // float pct = (sin(u_time)+1.0)/2.0;
        float pct = smoothstep(.0, 1., (sin(u_time * 3.0) + 1.) / 2. );

        color = mix(colorA, colorB, pct);

        gl_FragColor = vec4(color, 1.0);
    }
    `,
    // Mixing multiple
    `
    #ifdef GL_ES
    precision mediump float;
    #endif

    #define PI 3.14159265359

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;

    vec3 colorA = vec3(0.149,0.141,0.912);
    vec3 colorB = vec3(1.000,0.833,0.224);

    float plot (vec2 st, float pct){
        return  smoothstep( pct-0.01, pct, st.y) -
                smoothstep( pct, pct+0.01, st.y);
    }

    void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        vec3 color = vec3(0.0);

        vec3 pct = vec3(st.x);

        pct.r = smoothstep(0.0, 1.0, st.x);
        pct.g = sin(st.x*PI);
        pct.b = pow(st.x, 0.5);

        color = mix(colorA, colorB, pct);

        color = mix(color, vec3(1.0,0.0,0.0),plot(st, pct.r));
        color = mix(color, vec3(0.0,1.0,0.0),plot(st, pct.g));
        color = mix(color, vec3(0.0,0.0,1.0),plot(st, pct.b));

        gl_FragColor = vec4(color, 1.0);
    }


    `,
    // Messing with mixing multiple
    `
    #ifdef GL_ES
    precision mediump float;
    #endif

    #define PI 3.14159265359

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;

    vec3 colorA = vec3(0.149,0.141,0.912);
    vec3 colorB = vec3(1.000,0.833,0.224);

    float plot (vec2 st, float pct){
        return  smoothstep( pct-0.01, pct, st.y) -
                smoothstep( pct, pct+0.01, st.y);
    }

    float normsin(float val){
        return (sin(val)+1.0) / 2.0;
    }
    float normcos(float val){
        return (cos(val)+1.0) / 2.0;
    }

    void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        vec3 color = vec3(0.0);

        vec3 pct = vec3(st.x);

        float y = 0.5 - pow(abs(st.x - normcos(u_time)), normsin(u_time*.5)*2.0+1.0);
        pct.r = normcos(u_time) - smoothstep(0.0, 1.0, st.x * normcos(u_time * 2.0));
        pct.g = y;
        pct.b = normsin(u_time);

        color = mix(colorA, colorB, pct);

        // color = mix(color, vec3(1.0,0.0,0.0),plot(st, pct.r));
        // color = mix(color, vec3(0.0,1.0,0.0),plot(st, pct.g));
        // color = mix(color, vec3(0.0,0.0,1.0),plot(st, pct.b));

        gl_FragColor = vec4(color, 1.0);
    }


    `
]

const Shaders = () => {

    const [page, setPage] = useState(0)
    const nInPage = 9
    const from = page * nInPage
    const to = (page + 1) * nInPage

    const width = 500, height = 500

    const GLSLCanvas = dynamic(() => import('../../components/code/shaders'), {
        ssr: false,
        loading: () => <div style={{ width, height, background: "gray" }} />
    })

    const fragmentsNumbered = fragments.map((fragment, index) => ({
        fragment, index
    }))


    return (
        <>
            <main>
                <p style={{ width: "100%", padding: "50px" }}>
                    Working through <a href="https://thebookofshaders.com" target="_blank">Book of Shaders</a>
                </p>
                {fragmentsNumbered.slice().reverse().slice(from, to).map(({fragment, index}) => (

                    <div className="canvascontainer" key={index}>
                        <GLSLCanvas
                            width={width} height={height}
                            fragment={fragment}
                        />
                        <p>{index}</p>
                    </div>
                ))}
            </main>

            <nav>
                <button
                    onClick={() => setPage(page + 1)}>
                    Next page
                </button>
            </nav>

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
                        flex-direction: row-reverse;
                        flex-wrap: wrap;
                        justify-content: center;
                        max-width: 1600px;
                    }

                    .canvascontainer {
                        position: relative;
                    }
                    .canvascontainer p {
                        font-size: 0.8rem;
                    }

                    nav {
                        display: flex;
                        justify-content: center;
                        height: 100px;
                        align-items: start;
                    }

                    button{
                        cursor: pointer;
                    }
                `}</style>
        </>
    )
}

export default withLayout(Shaders, 'book of shaders')
