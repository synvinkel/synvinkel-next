import { useRef, useEffect, useState, Component } from 'react'
import withLayout from '../../components/Layout'


class Vector {
    constructor(x, y) {
        this.x = x || 0
        this.y = y || 0
    }
}

class Boundary {
    constructor(x1, y1, x2, y2) {
        this.a = new Vector(x1, y1)
        this.b = new Vector(x2, y2)
    }

    show(ctx) {
        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = 'white'
        ctx.moveTo(this.a.x, this.a.y)
        ctx.lineTo(this.b.x, this.b.y)
        ctx.stroke()
        ctx.restore()
    }
}

class Raycasting extends Component {

    constructor() {
        super()
        this.state = {
            boundaries: []
        }
    }

    componentDidMount() {
        this.ctx = this.canvas.getContext('2d')
        this.setup()
    }

    setup = () => {
        this.width = 720, this.height = 540
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.setState({ boundaries: [...this.state.boundaries, new Boundary(0, 0, this.width, this.height)] })

        this.loop()
    }

    loop = () => {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.width, this.height)
        const { boundaries } = this.state
        boundaries.forEach(boundary => boundary.show(this.ctx))
        requestAnimationFrame(this.loop)
    }

    render() {
        return (
            <div className="container">

                <canvas ref={ref => this.canvas = ref} />

                <style jsx>{`
                 
                 .container {
                     height: 100vh;
                     display: grid;
                     justify-content: center;
                     align-items: center;
                 }
    
                `}</style>
            </div >
        )
    }
}

export default withLayout(Raycasting, 'Raycasting')