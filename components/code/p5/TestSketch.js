import useP5 from ".";
import { useRef } from "react";

export default function TestSketch() {

    const ref = useRef()
    useP5((s) => {

        s.setup = () => {
            s.createCanvas(200, 200)
        }

        s.draw = () => {
            s.background(0)
            s.fill(255)
            s.rect(s.mouseX, s.mouseY, 50, 50)
        }
    }, ref)

    return <div ref={ref} />

}
