import useSketch from "../../p5"
import { useRef } from "react"


export default function () {

    const play = useRef(false)

    const [allShapes] = useSketch(s => {

        let radius
        let invert = false
        let num

        s.setup = () => {
            const { width, height } = allShapes.current.getBoundingClientRect()
            s.createCanvas(width, height)
            radius = width * 0.4
        }

        s.draw = () => {
            s.background(invert ? 'white' : 'black')
            if (num > 6) {
                invert = !invert
                s.frameCount = 0
            }

            s.push()
            s.translate(s.width / 2, s.height / 2)
            s.beginShape()
            s.fill(invert ? 'black' : 'white')
            s.stroke(invert ? 'white' : 'black')
            if (play.current) {
                s.rotate(s.frameCount * 0.04)
                num = s.frameCount * 0.02 + 2
            }
            if (Number.isInteger(num)) {
                invert = !invert
            }
            for (let i = 0; i < num; i++) {
                s.vertex(
                    s.cos((s.TWO_PI / num) * i + (s.PI / 2)) * radius,
                    s.sin((s.TWO_PI / num) * i + (s.PI / 2)) * radius,
                )
            }
            s.endShape()
            s.pop()


        }

        s.windowResized = () => {
            const { width, height } = allShapes.current.getBoundingClientRect()
            s.resizeCanvas(width, height)
        }
    })

    const [roundedRef] = useSketch(s => {

        s.setup = () => {
            const { width, height } = roundedRef.current.getBoundingClientRect()
            s.createCanvas(width, height)
        }

        s.draw = () => {
            s.background(255)

            const radius = s.width / 3

            let a = 0 // (s.mouseX / s.width) * s.TWO_PI
            a += s.PI * 0.75

            s.push()
            s.stroke('black')
            s.noFill()
            s.translate(s.width / 2, s.height / 2)

            s.beginShape()

            for (let i = 0; i < 4 + 1; i++) {
                const x = s.cos((s.TWO_PI / 4) * i) * radius
                const y = s.sin((s.TWO_PI / 4) * i) * radius

                s.push()
                s.translate(x, y)
                s.noFill()
                s.stroke('green')
                s.ellipse(0, 0, 10, 10)
                s.stroke('red')
                s.ellipse(s.cos(a +( s.TWO_PI / 4) * i) * radius / 2, s.sin( a +( s.TWO_PI / 4) * i ) * radius / 2, 10, 10)
                s.stroke('blue')
                s.ellipse(s.cos(a + (0) * i ) * radius / 2, s.sin( a + (0) * i ) * radius / 2, 10, 10)
                s.pop()
                
                s.vertex(x, y)
            }

            s.endShape()

      

            s.pop()

            s.text(a, 10, 10)
        }

        s.windowResized = () => {
            const { width, height } = roundedRef.current.getBoundingClientRect()
            s.resizeCanvas(width, height)
        }
    })

    return <>
        <div className="sketch">
            <div ref={roundedRef} />
        </div>
        <div className="sketch"
            onClick={() => {
                play.current = !play.current
            }}
        >
            <div ref={allShapes} />
        </div>

        <style jsx>{`
                    .sketch {
                        width: 400px;
                        max-width: 90%;
                        height: 400px;
                        margin: 0 auto;
                        margin-bottom: 40px;
                    }
            `}</style>
    </>
}
