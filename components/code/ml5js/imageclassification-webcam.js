import { useRef, useEffect, useState } from 'react'
import ml5 from 'ml5'

class Sketch {
    constructor(canvas, video) {
        this.canvas = canvas
        this.video = video
        this.ctx = canvas.getContext('2d')
        this.setup()
    }

    setup = async () => {
        this.width = 720
        this.height = 540
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.video.width = this.width
        this.video.height = this.height

        this.mobilenet = await ml5.imageClassifier('MobileNet', this.video)
        this.mobilenet.predict(this.gotResults)

        this.loop()
    }

    gotResults = (error, pred) => {
        if (error) {
            console.error(error)
        } else {
            this.setPrediction(pred)
            this.mobilenet.predict(this.gotResults)
        }
    }

    background = (color) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    loop = () => {
        this.background('black')

        this.ctx.drawImage(this.video, 0, 0, this.width, this.height)

        requestAnimationFrame(this.loop)
    }
}

export default function ImageClassifier() {
    const canvasRef = useRef(null)
    const videoRef = useRef(null)
    const [sketch, setSketch] = useState(null)
    const [prediction, setPrediction] = useState(null)

    useEffect(() => {
        async function setup() {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })

            const video = videoRef.current
            video.srcObject = stream
            const canvas = canvasRef.current

            const s = new Sketch(canvas, video)
            s.setPrediction = setPrediction
            setSketch(s)
        }
        setup()
    }, [])

    return (
        <>
            <canvas ref={canvasRef} />
            <video autoPlay={true} ref={videoRef} />
            {prediction && <div className="pred">{prediction.map(pred => <p key={pred.label}><b>{pred.label.split(',')[0]}:</b> {pred.confidence}</p>)}</div>}
            <style jsx>{`
                video {
                    display: none;
                }
                .pred{
                    width: 400px;
                }
            `} </style>
        </>
    )
}