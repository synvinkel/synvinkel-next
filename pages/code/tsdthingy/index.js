import { useEffect, useState } from 'react'

const TSDThingy = () => {

    const [midi, setMidi] = useState(null)
    const [message, setMessage] = useState([])

    const onMIDIMessage = (message) => {
        setMessage(message.data)
        console.log(message.data)
    }

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
            {Array.from(message).map(part => <h1>{part}</h1>)}
        </>
    )

}

export default TSDThingy