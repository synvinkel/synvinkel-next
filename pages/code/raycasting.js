import { Component } from 'react'
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
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.restore()
    }
}

class Ray {
    constructor(x, y) {
        this.pos = new Vector(x, y)
        this.dir = new Vector(1, 0)
    }

    show(ctx) {
        const { x, y } = this.pos
        ctx.save()
        ctx.translate(x, y)
        ctx.fillStyle = 'red'
        ctx.strokeStyle = 'red'
        // ctx.fillRect(0, 0, 5, 5)
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(this.dir.x * 20, this.dir.y * 20)
        ctx.stroke()
        ctx.restore()
    }

    cast(wall) {
        const { x: x1, y: y1 } = wall.a
        const { x: x2, y: y2 } = wall.b
        const { x: x3, y: y3 } = this.pos
        const x4 = this.pos.x + this.dir.x
        const y4 = this.pos.y + this.dir.y

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
        if (den === 0) {
            return
        }
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den

        if(t > 0 && t < 1 && u > 0) {
            return true
        } else {
            return
        }
    }
}

class Raycasting extends Component {

    constructor() {
        super()
        this.state = {
            boundaries: [],
            rays: []
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
        this.setState({ rays: [...this.state.rays, new Ray(this.width * .25, this.height * .75, this.width * .75, this.height * .25)] })

        this.loop()
    }

    loop = () => {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.width, this.height)
        const { boundaries, rays } = this.state

        rays.forEach(ray => boundaries.forEach(wall => ray.cast(wall)))

        boundaries.forEach(boundary => boundary.show(this.ctx))
        rays.forEach(ray => ray.show(this.ctx))

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