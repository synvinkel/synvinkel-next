import withLayout from '../../../components/Layout'
import { useRef, useEffect, useState } from 'react'
import { runInThisContext } from 'vm'

class Sketch {
    constructor(canvas) {
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

        this.loop()
    }

    background = (color) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    loop = () => {
        this.background('black')

        const radius = 100

        this.ctx.save()

        this.ctx.translate(200, this.height / 2)
        this.ctx.beginPath()
        this.ctx.strokeStyle = 'white'
        this.ctx.arc(0, 0, radius, 0, Math.PI * 2)
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.fillStyle = 'white'
        const x = Math.sin(this.time) * radius, y = Math.cos(this.time) * radius
        this.ctx.arc(x, y, 8, 0, Math.PI * 2)
        this.ctx.fill()

        this.ctx.beginPath()
        this.ctx.moveTo(0, 0)
        this.ctx.lineTo(x, y)
        this.ctx.stroke()

        this.ctx.restore()

        this.time += 0.01

        requestAnimationFrame(this.loop)
    }
}

export default withLayout(() => {

    const ref = useRef(null)

    useEffect(() => {
        new Sketch(ref.current)
    })

    return (
        <div className="container">
            <canvas ref={ref} />
            <style jsx>{`
                .container{
                    height: 100vh;
                    display: grid;
                    justify-content: center;
                    align-items: center;
                }
                `} </style>
        </div>
    )
}, 'fourierseries')