import { useEffect, useState } from 'react'
import { scaleQuantize } from "d3-scale"

const pads = [48, 53, 59, 57, 54, 51, 49, 55, 58, 56, 52, 50]
const wholetone = ["C0", "D0", "E0", "F#0", "G#0", "Bb0", "C1", "D1", "E1", "F#1", "G#1", "Bb1", "C2", "D2", "E2", "F#2", "G#2", "Bb2", "C3", "D3", "E3", "F#3", "G#3", "Bb3", "C4", "D4", "E4", "F#4", "G#4", "Bb4", "C5", "D5", "E5", "F#5", "G#5", "Bb5", "C6", "D6", "E6", "F#6", "G#6", "Bb6", "C7", "D7", "E7", "F#7", "G#7", "Bb7", "C8", "D8", "E8", "F#8", "G#8", "Bb8"]
const wholetoneScale = scaleQuantize()
    .domain([0, 10000])
    .range(wholetone);

const TSDThingy = ({ query }) => {

    const [midi, setMidi] = useState(null)
    const [message, setMessage] = useState([])
    const [images, setImages] = useState(null)

    const onMIDIMessage = (message) => {
        message = Array.from(message.data)
        setMessage(message)
    }

    useEffect(() => {
        console.log(query)
        async function fetchData() {
            const data = await fetch('/static/code/tsdthingy/angamonths.json')
            const json = await data.json()
            setImages(json)
        }
        fetchData()
    }, [])


    useEffect(() => {
        if (message.length > 0) {
            console.log(message)
            const pad = pads.indexOf(message[1])
            console.log(images[pad])
        }
    }, [message])

    useEffect(() => {
        if (images) {
            if (navigator.requestMIDIAccess) {
                console.log('Browser supports MIDI!');
                navigator.requestMIDIAccess()
                    .then((midi) => {
                        console.log('got midi', midi)
                        setMidi(midi)

                        const inputs = midi.inputs.values()

                        for (var input = inputs.next();
                            input && !input.done;
                            input = inputs.next()) {
                            input.value.onmidimessage = onMIDIMessage
                        }
                    },
                        () => {
                            console.log('Failed to access MIDI')
                        })
            }
        }
    }, [images])

    return (
        <>
            {midi ? 'MIDI!' : 'No MIDI :('}
            {message.map((part, i) => <h1 key={i}>{part}</h1>)}
        </>
    )

}

TSDThingy.getInitialProps = ({ query }) => {
    return { query }
}

export default TSDThingy