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

        this.mobilenet = await ml5.featureExtractor('MobileNet')
        this.predictor = this.mobilenet.regression(this.video)
        console.log('ready')

        this.loop()
    }

    gotResults = (error, pred) => {
        if (error) {
            console.error(error)
        } else {
            console.log(pred)
            this.setPrediction(pred)
            this.predictor.predict(this.gotResults)
        }
    }

    background = (color) => {
        this.ctx.fillStyle = color
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    addValue = (value) => {
        this.predictor.addImage(value)
        console.log(`added value ${value}`)
    }

    trainModel = () => {
        this.predictor.train((loss) => {
            if (loss === null) {
                console.log('training done')
                this.predictor.predict(this.gotResults)
            } else {
                console.log(loss)
            }
        })
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
    const [slideval, setSlideval] = useState(0.5)

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
            <canvas
                ref={canvasRef}
            />
            <video autoPlay={true} ref={videoRef} />

            <input type="range"
                min="0" max="1" step="0.01" value={slideval}
                onChange={(e) => {
                    setSlideval(e.target.value)
                }}
            />
            <div>
                <button onClick={() => sketch && sketch.addValue(slideval)}>Add image</button>
                <button onClick={() => sketch && sketch.trainModel()}>Train</button>
            </div>

            {prediction && (
                <div>
                    {prediction.value}
                </div>
            )}
            <style jsx>{`
                video {
                    display: none;
                }
                canvas{
                    cursor: pointer;
                    opacity: 1;
                    transition: opacity .2s ease;
                }

                canvas:active {
                    opacity: 0;
                }
                .pred{
                    width: 400px;
                }
            `} </style>
        </>
    )
}