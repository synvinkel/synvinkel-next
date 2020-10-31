import useSketch from ".";

export default function TestSketch() {

    const [domRef] = useSketch((s) => {

        s.setup = () => {

            const { width, height } = domRef.current.getBoundingClientRect()

            s.createCanvas(width, height)
        }

        s.draw = () => {
            s.background(0, 10)
            s.fill(255)
            s.rect(s.mouseX, s.mouseY, 50, 50)
        }

        s.windowResized = () => {
            const { width, height } = domRef.current.getBoundingClientRect()
            s.resizeCanvas(width, height)
        }

    })

    return <div ref={domRef} />
}
