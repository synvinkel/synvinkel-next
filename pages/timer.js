// import dynamic from 'next/dynamic'

// const Timer = dynamic(import('../components/timer/index.js'), {
//     ssr: false,
// })

// const Page = () => (
//     <div>
//         <Timer />
//     </div>
// )

// export default Page

import { useState, useReducer, useEffect, useRef } from "react"
import { useInterval, FillDiv } from '../components/timer'

const timerMachine = {
    initial: 'idle',
    states: {
        idle: { on: { NEXT: 'running' } },
        running: { on: { NEXT: 'pause', FINISH: 'alarm' } },
        pause: { on: { NEXT: 'running', RESET: 'idle' } },
        alarm: { on: { NEXT: 'idle' } }
    }
}

const timerTransition = (state, event) => {
    return timerMachine.states[state].on[event] || state;
}

const buttonStates = {
    'idle': 'Start',
    'running': 'pause',
    'pause': 'Resume',
    'alarm': 'Reset',
}

export default function () {
    const [timerState, timerSend] = useReducer(
        timerTransition,
        timerMachine.initial
    )

    const [initialTime, setInitialTime] = useState(3000)
    const [time, setTime] = useState(initialTime)

    const second = 1000
    const fraction = 100


    useInterval(() => {
        setTime(time - (second / fraction))
    }, timerState === 'running' ? (second / fraction) : null)

    useEffect(() => {
        switch (timerState) {
            case 'running':
                if (time <= 0) {
                    setTime(0)
                    timerSend('FINISH')
                }
                break
            case 'idle':
                setInitialTime(time)
            default:
                break
        }
    }, [time])

    useEffect(() => {
        switch (timerState) {
            case 'idle':
                setTime(initialTime)
                break
            default:
                break
        }
    }, [timerState])


    return (
        <>
            <div >
                The timer is <strong>{timerState}</strong>
                <button onClick={() => timerSend('NEXT')} > {buttonStates[timerState]} </button>
                {timerState === 'pause' && <button onClick={() => timerSend('RESET')} > reset </button>}
                {timerState === 'idle' && (
                    <input
                        type="number"
                        value={time / second}
                        onChange={e => setTime(e.target.value * second)}
                    />
                )}
            </div>
            <div style={{ background: timerState === 'alarm' ? 'red' : 'inherit' }}>
                {(time / second).toFixed(1)}
            </div>
            <FillDiv
                time={time}
                initialTime={initialTime}
            />
        </>
    )
} 