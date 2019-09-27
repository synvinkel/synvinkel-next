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
        const {x, y} = this.pos
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