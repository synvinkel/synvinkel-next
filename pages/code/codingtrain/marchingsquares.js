import withLayout from '../../../components/Layout'
import { useRef, useEffect, useState } from 'react'
import SimplexNoise from 'simplex-noise'

class Sketch {

    field = []
    res = 32

    constructor(canvas) {

        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.noise = new SimplexNoise()
        this.setup()

        console.log(this.noise.noise3D(0.1, 2, 0.04))
    }

    setup = () => {
        this.resize()
        this.loop()
    }

    resize = () => {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.cols = 1 + this.width / this.res
        this.rows = 1 + this.height / this.res

        this.newField()
    }

    newField = () => {
        this.field = []
        for (let y = 0; y < this.rows; y++) {
            this.field.push([])
            for (let x = 0; x < this.cols; x++) {
                // this.field[y].push(Math.floor(Math.random() * 2))
                const t = performance.now() * 0.0001
                const noise = this.noise.noise3D(
                    x * 0.05 + t,
                    y * 0.05,
                    t,
                )
                this.field[y].push(Math.floor(noise + 1))
            }
        }
    }

    background = (color) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    getId = (row, col) => {
        const a = this.field[row][col]
        const b = this.field[row][col + 1]
        const c = this.field[row + 1][col + 1]
        const d = this.field[row + 1][col]

        return parseInt(`${a}${b}${c}${d}`, 2)
    }

    fill = (row, col, color) => {
        const x = this.res * col
        const y = this.res * row
        const u = this.res / 2
        const c = this.ctx

        c.save()
        c.translate(x, y)
        // c.fillStyle = 'white'
        c.fillStyle = color || '#a8605d'
        c.beginPath()

        switch (this.getId(row, col)) {
            case 1:
                c.moveTo(0, u)
                c.lineTo(u, u * 2)
                c.lineTo(0, u * 2)
                break
            case 2:
                c.beginPath()
                c.moveTo(u, u * 2)
                c.lineTo(u * 2, u)
                c.lineTo(u * 2, u * 2)
                break
            case 3:
                c.moveTo(0, u)
                c.lineTo(u * 2, u)
                c.lineTo(u * 2, u * 2)
                c.lineTo(0, u * 2)
                break
            case 4:
                c.moveTo(u, 0)
                c.lineTo(u * 2, 0)
                c.lineTo(u * 2, u)
                break
            case 5:
                c.moveTo(0, u)
                c.lineTo(u, u * 2)
                c.lineTo(0, u * 2)

                c.moveTo(u, 0)
                c.lineTo(u * 2, 0)
                c.lineTo(u * 2, u)
                break
            case 6:
                c.moveTo(u, 0)
                c.lineTo(u * 2, 0)
                c.lineTo(u * 2, u * 2)
                c.lineTo(u, u * 2)
                break
            case 7:
                c.moveTo(0, u)
                c.lineTo(u, 0)
                c.lineTo(u * 2, 0)
                c.lineTo(u * 2, u * 2)
                c.lineTo(0, u * 2)
                break
            case 8:
                c.moveTo(0, 0)
                c.lineTo(u, 0)
                c.lineTo(0, u)
                break
            case 9:
                c.moveTo(0, 0)
                c.lineTo(u, 0)
                c.lineTo(u, u * 2)
                c.lineTo(0, u * 2)
                break
            case 10:
                c.moveTo(0, 0)
                c.lineTo(u, 0)
                c.lineTo(0, u)

                c.moveTo(u, u * 2)
                c.lineTo(u * 2, u)
                c.lineTo(u * 2, u * 2)
                break
            case 11:
                c.moveTo(0, 0)
                c.lineTo(u, 0)
                c.lineTo(u * 2, u)
                c.lineTo(u * 2, u * 2)
                c.lineTo(0, u * 2)
                break
            case 12:
                c.moveTo(0, 0)
                c.lineTo(u * 2, 0)
                c.lineTo(u * 2, u)
                c.lineTo(0, u)
                break
            case 13:
                c.moveTo(0, 0)
                c.lineTo(u * 2, 0)
                c.lineTo(u * 2, u)
                c.lineTo(u, u * 2)
                c.lineTo(0, u * 2)
                break
            case 14:
                c.moveTo(0, 0)
                c.lineTo(u * 2, 0)
                c.lineTo(u * 2, u * 2)
                c.lineTo(u, u * 2)
                c.lineTo(0, u)
                break
            case 15:
                c.moveTo(0, 0)
                c.lineTo(u * 2, 0)
                c.lineTo(u * 2, u * 2)
                c.lineTo(0, u * 2)

        }

        c.fill()
        c.restore()

    }

    loop = () => {

        this.newField()

        this.background('#d1a67e ')


        this.ctx.save()
        for (let row = 0; row < this.rows - 1; row++) {
            for (let col = 0; col < this.cols - 1; col++) {
                const x = this.res * col
                const y = this.res * row


                this.fill(row, col)

                // this.ctx.beginPath()
                // this.ctx.fillStyle = ['white', 'black'][this.field[row][col]]
                // this.ctx.arc(x, y, this.res / 4, 0, Math.PI * 2, true)
                // this.ctx.fill()

                // this.ctx.fillText(this.getId(row, col), x + this.res * 0.2, y + this.res * 0.6)
            }
        }

        this.ctx.translate(this.res, this.res)
        for (let row = 0; row < this.rows - 1; row++) {
            for (let col = 0; col < this.cols - 1; col++) {
                this.fill(row, col, '#654053')
            }
        }



        this.ctx.restore()

        this.time += 8 / this.n * 0.04

        requestAnimationFrame(this.loop)
    }
}

export default withLayout(() => {

    const ref = useRef(null)
    const [sketch, setSketch] = useState(null)

    useEffect(() => {
        setSketch(new Sketch(ref.current))
    }, [])

    useEffect(() => {
        if (sketch) {
            const handleResize = () => {
                console.log('reisze')
                sketch.resize()
            }

            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [sketch])

    return (
        <div className="container">
            <canvas ref={ref} onClick={() => sketch.newField()} />
            <style jsx>{`
                .container{
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                `} </style>
        </div>
    )
}, 'fourierseries')