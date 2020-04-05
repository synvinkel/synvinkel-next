import useSketch from "../../p5"

export default function Natural() {

    const [domRef] = useSketch((s) => {

        s.setup = () => {

            const { width, height } = domRef.current.getBoundingClientRect()

            s.createCanvas(width, height)
        }

        s.draw = () => {
            s.background(0)

            s.strokeWeight(5)

            s.push()
            s.translate(s.width * 0.475, s.height * 0.3)
            for (let i = 0; i < 3; i++) {
                s.rotate(-s.TWO_PI / 3)
                s.ellipse(s.width * 0.1, 0, s.width * 0.25, s.width * 0.25)
            }
            s.pop()

            s.push()
            s.triangle(
                s.width / 2, s.height * 0.9,
                s.width * 0.3, s.height * 0.4,
                s.width * 0.7, s.height * 0.3,
            )
            s.pop()

            s.push()
            s.noFill()
            s.stroke(0)
            s.strokeWeight(3)

            s.translate(s.width * .3, s.height * .425)
            s.rotate(-.25)

            for (let y = 0; y < 10; y++) {
                for (let x = 0; x < 8; x++) {
                    s.rect(x + 20 * x, y + 20 * y, s.height * 0.04, s.height * 0.04)
                }
            }

            s.pop()


        }

        s.windowResized = () => {
            const { width, height } = domRef.current.getBoundingClientRect()
            s.resizeCanvas(width, height)
        }

    })

    return <>
        <div className="sketch">
            <div ref={domRef} />
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
