import { Component } from 'react';
import {
    geoPath,
    geoOrthographic,
    geoGraticule,
    geoInterpolate
} from 'd3-geo'
import { easeCubic } from "d3-ease";
import { scaleLinear } from 'd3-scale'
import { lineString } from '@turf/helpers'
function ease() {
    const start = new Date().getTime();
    return (duration) => {
        let elapsed = new Date().getTime() - start;
        if (elapsed > duration) {
            elapsed = duration;
        }
        let t = elapsed / duration;
        return easeCubic(t);
    };
}

class App extends Component {
    constructor(props) {
        super(props)

        this.projection = geoOrthographic()
        this.running = true
        this.state = {
            width: props.width || 500,
            height: props.height || 500,
        }
    }

    componentDidMount() {
        this.getData()
    }

    componentWillUnmount() {
        this.running = false
    }

    getData = async () => {
        const geojson = await (await fetch('/code/geolines/land.geojson')).json()
        console.log(geojson)
        this.setState({ geojson })
        this.init()
    }

    init = () => {
        const { width, height, geojson } = this.state

        this.rotScale = scaleLinear()
            .domain([0, width])
            .range([0, 360])

        this.easeDuration = 1000
        this.startRot = 0
        this.nextRot = this.startRot
        this.rot = this.startRot
        this.e = ease(0)
        this.projection.fitExtent([[50, 50], [width - 50, height - 50]], geojson)

        this.newPoint(geoInterpolate([145, -27], [15, 59]))

        this.projection.translate([width / 2, height / 2])
        this.animationRequest = requestAnimationFrame(this.tick)
    }

    newPoint = (geoInt) => {
        this.geoInterpolate = geoInt
        this.arrived = false
    }


    tick = () => {

        if (this.running) {
            this.update()
            this.paint()
            requestAnimationFrame(this.tick)
        }
        else {
            cancelAnimationFrame(this.animationRequest)
        }
    }

    update = () => {
        const ctx = this.canvas.getContext('2d')
        this.rot = this.startRot + (this.nextRot - this.startRot) * this.e()
        const r = this.geoInterpolate(this.e(1000))
        this.projection.rotate([-r[0], -r[1]])
    }

    paint = () => {
        const { width, height, geojson } = this.state
        const ctx = this.canvas.getContext('2d')

        const geopath = geoPath(this.projection, ctx)

        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = 'rgb(10, 10, 10)'
        ctx.fillRect(0, 0, width, height)

        geojson.features.forEach((f, i) => {
            ctx.beginPath()
            geopath(f)
            ctx.fillStyle = 'white'
            ctx.fill()
        })

        ctx.beginPath()
        geopath(lineString([this.geoInterpolate(this.e(1500)), this.geoInterpolate(this.e(1000))]))
        ctx.lineWidth = 3
        ctx.strokeStyle = 'red'
        ctx.stroke()

        ctx.beginPath()
        geopath(geoGraticule()())
        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgba(200, 100, 50, 0.1)'
        ctx.stroke()
    }

    newRot = (newrot) => {
        this.startRot = this.startRot + (this.nextRot - this.startRot) * this.e();
        this.nextRot = newrot;
    };

    onClick = (e) => {
        this.e = ease(this.easeDuration)
        this.newPoint(
            geoInterpolate(
                [Math.random() * 360 - 180, Math.random() * 180 - 90],
                [15, 59]
            )
        )
    }

    render() {
        const { width, height } = this.state
        return (
            <canvas
                onClick={this.onClick}
                ref={(el) => { this.canvas = el }}
                width={width}
                height={height}
            />
        );
    }
}

export default App;
