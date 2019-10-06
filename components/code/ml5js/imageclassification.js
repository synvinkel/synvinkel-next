import withLayout from '../../../components/Layout'
import { useRef, useEffect, useState } from 'react'
import ml5 from 'ml5'

class Sketch {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.setup()
    }

    setup = async () => {
        this.width = 720
        this.height = 540
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.mobilenet = await ml5.imageClassifier('MobileNet')

        this.puffin = new Image()
        this.puffin.src = '/static/code/ml5js/imageclassification/puffin.jpg'
        this.puffin.onload = async () => {
            console.log('puffin loaded')
            const pred = await this.mobilenet.predict(this.puffin)
            this.setPrediction(pred)
            console.log(pred)
        }

        this.loop()
    }

    background = (color) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    loop = () => {
        this.background('black')

        this.ctx.drawImage(this.puffin, 0, 0, this.width, this.height)

        requestAnimationFrame(this.loop)
    }
}

export default function ImageClassifier() {
    const ref = useRef(null)
    const [sketch, setSketch] = useState(null)
    const [prediction, setPrediction] = useState(null)

    useEffect(() => {
        const s = new Sketch(ref.current)
        s.setPrediction = setPrediction
        setSketch(s)
    }, [])

    return (
        <>
            <canvas ref={ref} />
            {prediction && <div>{prediction.map(pred => <p key={pred.label}><b>{pred.label.split(',')[0]}:</b> {pred.confidence}</p>)}</div>}
        </>
    )
}