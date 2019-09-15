import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import {
    //   geoMercator,
    geoPath,
    geoOrthographic,
    geoGraticule,
    geoInterpolate
} from 'd3-geo'
import { easeCubic } from "d3-ease";
import { scaleLinear } from 'd3-scale'
// import { coordEach, coordReduce } from '@turf/meta'
// import { select } from 'd3-selection'
// import { transition } from 'd3-transition'
import { lineString } from '@turf/helpers'

// import ParticleSystem from './ParticleSystem'

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
            width: window.innerWidth,
            height: window.innerHeight,
        }
    }

    componentDidMount() {
        this.getData()
        window.addEventListener('resize', () => {
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight,
            })
            this.init()
        })
    }

    componentWillUnmount() {
        this.running = false
    }

    getData = async () => {
        const geojson = await (await fetch('/static/code/geolines/land.geojson')).json()
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
        this.e = ease(this.easeDuration)
        this.projection.fitExtent([[50, 50], [width - 50, height - 50]], geojson)

        this.pss = []
        // this.ps = new ParticleSystem(width / 2, height / 2, 1000)
        // this.ps.init()
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
        const { geojson, width, height } = this.state
        const ctx = this.canvas.getContext('2d')
        this.rot = this.startRot + (this.nextRot - this.startRot) * this.e()
        // this.projection.rotate([this.rotScale(this.rot), 0, 0])
        // this.projection.center(this.geoInterpolate(this.e()))
        const r = this.geoInterpolate(this.e(1000))
        // console.log(this.e(1000))
        // console.log(test)
        this.projection.rotate([-r[0], -r[1]])

        // if (!this.arrived && this.e(1250) === 1) {
        //   this.arrived = true
        //   this.pss.push(new ParticleSystem(this.projection.invert([width / 2, height / 2]), 1000))
        // }

        // this.ps.update()
        for (let i = this.pss.length; i > 0; i--) {
            const ps = this.pss[i - 1]
            ps.update(this.projection)
            if (!ps.running) this.pss.splice(i - 1, 1)
        }
    }

    paint = () => {
        const { width, height, geojson } = this.state
        const ctx = this.canvas.getContext('2d')

        const geopath = geoPath(this.projection, ctx)

        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = 'rgb(10, 10, 10)'
        ctx.fillRect(0, 0, width, height)

        // ctx.strokeStyle = 'white'

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

        this.pss.forEach(ps => {
            ps.draw(ctx, this.projection, geopath)
        })
    }

    newRot = (newrot) => {
        this.startRot = this.startRot + (this.nextRot - this.startRot) * this.e();
        // this.e = ease(this.easeDuration);
        this.nextRot = newrot;
    };

    mousemove = (e) => {
        // const { clientX, clientY } = e
        // this.newRot(clientX)
    }

    mouseDown = (e) => {
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
                onMouseDown={this.mouseDown}
                onTouchStart={this.mouseDown}
                onMouseMove={this.mousemove}
                ref={(el) => { this.canvas = el }}
                width={width}
                height={height}
            />
        );
    }
}

export default App;
