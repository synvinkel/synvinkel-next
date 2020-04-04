import useSketch from "../../p5"

export default function Natural() {

    const [domRef] = useSketch((s) => {

        s.setup = () => {

            const { width, height } = domRef.current.getBoundingClientRect()

            s.createCanvas(width, height)
        }

        s.draw = () => {
            s.background(200)

            s.push()
            s.translate(s.width - 5, s.height / 2)
            s.rotate(- s.PI / 6)
            s.rectMode(s.CENTER)
            s.fill(0)
            s.rect(0, 0, 100, 200)
            s.pop()
        }

        s.windowResized = () => {
            const { width, height } = domRef.current.getBoundingClientRect()
            s.resizeCanvas(width, height)
        }

    })

    return <>
        <div ref={domRef} />
        <p>Observant</p>
    </>
}
