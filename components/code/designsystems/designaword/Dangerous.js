import useSketch from "../../p5"

export default function Natural() {

    const [domRef] = useSketch((s) => {

        s.setup = () => {

            const { width, height } = domRef.current.getBoundingClientRect()

            s.createCanvas(width, height)
        }

        s.draw = () => {
            s.background(200)

            s.rectMode(s.CENTER)
            s.fill(0)
            s.rect(s.width / 2, s.height * 0.6, s.width * 0.9, s.height)
        }

        s.windowResized = () => {
            const { width, height } = domRef.current.getBoundingClientRect()
            s.resizeCanvas(width, height)
        }

    })

    return <>
        <div ref={domRef} />
        <p>Farlig</p>
    </>
}
