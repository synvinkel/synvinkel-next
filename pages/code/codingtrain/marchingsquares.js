import withLayout from '../../../components/Layout'
import { useRef, useEffect, useState } from 'react'

class Sketch {

    field = []
    res = 20

    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.setup()
    }

    setup = () => {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.cols = 1 + this.width / this.res
        this.rows = 1 + this.height / this.res

        for(let y=0; y<this.rows;y++){
            this.field.push([])
            for(let x=0;x<this.cols;x++){
                this.field[y].push(Math.floor(Math.random() * 2))
            }
        }

        console.log(this.field)

        this.loop()
    }

    background = (color) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    loop = () => {
        this.background('tomato')


        this.ctx.save()

        for(let row=0; row<this.rows;row++){
            for(let col=0;col<this.cols;col++){
                const x = this.res * col
                const y = this.res * row
                this.ctx.fillStyle = ['black', 'white'][this.field[row][col]]
                this.ctx.beginPath()
                this.ctx.arc(x, y, this.res / 8, 0, Math.PI * 2, true)
                this.ctx.fill()
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

    return (
        <div className="container">
            <canvas ref={ref} />
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