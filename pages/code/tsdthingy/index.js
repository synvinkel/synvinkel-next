import { useEffect, useState } from 'react'

const PADS = [48, 53, 59, 57, 54, 51, 49, 55, 58, 56, 52, 50]

const TSDThingy = () => {

    const [midi, setMidi] = useState(null)
    const [message, setMessage] = useState([])
    const [pads, setPads] = useState([])

    const onMIDIMessage = (message) => {
        message = Array.from(message.data)
        setMessage(message)
    }

    useEffect(() => {
        if (message[0] === 144) {
            setPads([...pads, message])
        }
    }, [message])

    useEffect(() => {
        console.log(pads.map(pad => pad[1]))
    }, [pads])

    useEffect(() => {
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
    }, [])

    return (
        <>
            {midi ? 'MIDI!' : 'No MIDI :('}
            {message.map((part, i) => <h1 key={i}>{part}</h1>)}
        </>
    )

}

export default TSDThingy