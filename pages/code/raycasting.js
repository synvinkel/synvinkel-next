import { Component } from 'react'
import withLayout from '../../components/Layout'

const c = {
    orange: '#eca936',
    green: '#a8c875',
    yellow: '#e2ef12',
    white: '#f4f9ec'
}

class Vector {
    constructor(x, y) {
        this.x = x || 0
        this.y = y || 0
    }

    copy() {
        return new Vector(this.x, this.y)
    }

    norm() {
        const len = this.mag()
        let normalized = this.copy()
        if (len !== 0) {
            normalized = this.mult(1 / len)
        }
        return normalized
    }

    set(x, y) {
        this.x = x
        this.y = y
    }

    mult(mult) {
        return new Vector(this.x * mult, this.y * mult)
    }

    static mult(v1, v2) {
        return new Vector(v1.x * v2.x, v1.y * v2.y)
    }

    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    static fromAngle(angle) {
        return new Vector(Math.sin(angle), Math.cos(angle))
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
        ctx.strokeStyle = 'gray'
        ctx.moveTo(this.a.x, this.a.y)
        ctx.lineTo(this.b.x, this.b.y)
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.restore()
    }
}

class Ray {
    constructor(pos, angle) {
        this.pos = pos
        this.dir = Vector.fromAngle(angle)
        this.hit = null
    }

    lookAt(x, y) {
        this.dir.x = x - this.pos.x
        this.dir.y = y - this.pos.y
        this.dir = this.dir.norm()
    }

    show(ctx) {
        let { x, y } = this.pos
        ctx.save()
        ctx.translate(x, y)
        ctx.lineWidth = 1
        ctx.strokeStyle = c.orange
        ctx.beginPath()
        ctx.moveTo(0, 0)
        const dirmult = this.dir.mult(100)
        ctx.lineTo(dirmult.x, dirmult.y)
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

        if (t > 0 && t < 1 && u > 0) {
            return new Vector(x1 + t * (x2 - x1), y1 + t * (y2 - y1))
        } else {
            return
        }
    }
}

class Particle {
    constructor(x, y, ctx) {
        this.ctx = ctx
        this.pos = new Vector(x, y)
        this.rays = []
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / 2 ** 6) {
            this.rays.push(new Ray(this.pos, angle))
        }
    }

    show() {
        const { x, y } = this.pos
        this.ctx.save()
        this.ctx.translate(x, y)
        this.ctx.fillStyle = c.green
        const w = 10
        this.ctx.translate(-w / 2, -w / 2)
        this.ctx.fillRect(0, 0, w, w)
        this.ctx.restore()

    }

    setPos(x, y) {
        this.pos.set(x, y)
    }

    look(wall) {
        this.rays.forEach(ray => {
            const pt = ray.cast(wall)
            if (pt) {
                this.ctx.save()
                this.ctx.strokeStyle = c.orange
                this.ctx.beginPath()
                this.ctx.moveTo(this.pos.x, this.pos.y)
                this.ctx.lineTo(pt.x, pt.y)
                this.ctx.stroke()
                this.ctx.restore()
            }
        })
    }
}

class Raycasting extends Component {

    constructor() {
        super()
        this.state = {
            boundaries: [],
        }
    }

    componentDidMount() {
        this.setup()
    }

    setup = () => {
        this.ctx = this.canvas.getContext('2d')
        this.particle = new Particle(this.width * .25, this.height * .75, this.ctx)
        this.width = 720, this.height = 540
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.boundaries = []
        this.boundaries.push(new Boundary(0, 0, this.width, 0))
        this.boundaries.push(new Boundary(this.width, 0, this.width, this.height))
        this.boundaries.push(new Boundary(this.width, this.height, 0, this.height))
        this.boundaries.push(new Boundary(0, this.height, 0, 0))
        this.boundaries.push(new Boundary(this.width * 0.25, this.height * 0.25, this.width * 0.75, this.height * 0.75))

        this.loop()
    }

    loop = () => {
        this.ctx.fillStyle = c.white
        this.ctx.fillRect(0, 0, this.width, this.height)

        this.boundaries.forEach(boundary => {
            boundary.show(this.ctx)
            this.particle.look(boundary)
        })
        this.particle.show()

        requestAnimationFrame(this.loop)
    }

    mouseMove = (e) => {
        this.particle.setPos(e.clientX, e.clientY)
    }

    render() {
        return (
            <div className="container">

                <canvas
                    onMouseMove={this.mouseMove}
                    ref={ref => this.canvas = ref}
                />

                <style jsx>{`
                 
                 .container {
                     justify-content: center;
                     align-items: center;
                 }

                 canvas {
                 }
    
                `}</style>
            </div >
        )
    }
}

export default withLayout(Raycasting, 'Raycasting')