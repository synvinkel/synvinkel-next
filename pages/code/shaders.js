import dynamic from 'next/dynamic'
import withLayout from '../../components/Layout'
import Header from '../../components/Header'

const GLSLCanvas = dynamic(() => import('../../components/code/shaders'), {
    ssr: false
})

const Shaders = () => {

    return (
        <>
            {/* <Header /> */}
            <main>
                <div className="canvascontainer">
                    <GLSLCanvas
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

                <style jsx global>{`
body {
    padding: 0;
    margin: 0;
}
            `}</style>

                <style jsx>{`
main {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    max-width: 1600px;
    justify-content: center;
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
