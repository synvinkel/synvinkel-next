import withLayout from '../../../components/Layout'
import { useRef, useEffect, useState } from 'react'

class Sketch {
    constructor(canvas, n) {
        this.n = n
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.setup()
    }

    setup = () => {
        this.width = 720
        this.height = 540
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.time = 0
        this.wave = []

        this.loop()
    }

    background = (color) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    setN = (n) => {
        this.n = n
    }

    loop = () => {
        this.background('black')

        let x = 0
        let y = 0
        const faint = 'rgba(255, 255, 255, 0.5)'
        const white = 'white'
        this.ctx.save()
        const xoffset1 = 200
        const xoffset2 = 170
        const radiusbase = 75

        this.ctx.translate(xoffset1, this.height / 2)

        for (let i = 0; i < this.n; i++) {
            let prevx = x
            let prevy = y

            let n = i * 2 + 1
            const radius = radiusbase * (4 / (n * Math.PI))

            x += radius * Math.cos(n * this.time)
            y += radius * Math.sin(n * this.time)

            this.wave.splice(this.width - xoffset1 + xoffset2)


            // big circle
            this.ctx.beginPath()
            this.ctx.lineWidth = 1
            this.ctx.strokeStyle = faint
            this.ctx.arc(prevx, prevy, radius, 0, Math.PI * 2)
            this.ctx.stroke()

            // joint
            this.ctx.beginPath()
            this.ctx.fillStyle = white
            this.ctx.arc(x, y, 4, 0, Math.PI * 2)
            this.ctx.fill()

            // limb
            this.ctx.beginPath()
            this.ctx.lineWidth = 2
            this.ctx.strokeStyle = white
            this.ctx.moveTo(prevx, prevy)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()



        }
        this.wave.unshift(y)

        this.ctx.save()
        this.ctx.translate(xoffset2, 0)
        this.ctx.beginPath()
        this.ctx.lineWidth = 1
        this.ctx.moveTo(x - xoffset2, y)
        this.wave.forEach((y, i) => {
            this.ctx.lineTo(i, y)
        })
        this.ctx.stroke()
        this.ctx.restore()
        this.ctx.restore()

        this.time += 8 / this.n * 0.04

        requestAnimationFrame(this.loop)
    }
}

export default withLayout(() => {

    const ref = useRef(null)
    const [sketch, setSketch] = useState(null)
    const [n, setN] = useState(5)

    console.log(this)

    useEffect(() => {
        setSketch(new Sketch(ref.current, n))
    }, [])

    useEffect(() => {
        if(sketch){
            sketch.setN(n)
        }
    }, [n])

    return (
        <div className="container">
            <canvas ref={ref} />
            <div>
                <input
                    type="range" name="n" min="1" max="100"
                    value={n}
                    onChange={e => setN(e.target.value)}
                />
            </div>
            <style jsx>{`
                .container{
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                input {
                    width: 720px;
                    margin-top: 10px;
                }
                `} </style>
        </div>
    )
}, 'fourierseries')