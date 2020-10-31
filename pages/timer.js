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

    const [targetTime, settargetTime] = useState(3000)
    const [start, setStart] = useState()
    const [elapsed, setElapsed] = useState(0)
    const [pauseTime, setPauseTime] = useState()

    const second = 1000
    const fraction = 60


    useInterval(() => {
        setElapsed(new Date().getTime() - start)
    }, timerState === 'running' ? (second / fraction) : null)

    useEffect(() => {
        switch (timerState) {
            case 'running':
                if (elapsed >= targetTime) {
                    setElapsed(targetTime)
                    timerSend('FINISH')
                }
                break
            default:
                break
        }
    }, [elapsed])

    useEffect(() => {
        switch (timerState) {
            case 'idle':
                setElapsed(0)
                setPauseTime(null)
                break
                
            case 'running':
                if (elapsed === 0) {
                    setStart(new Date().getTime())
                }
                if (pauseTime) {
                    const pauseTimeDelta = new Date().getTime() - pauseTime
                    setStart(start + pauseTimeDelta)
                }

            case 'pause':
                setPauseTime(new Date().getTime())

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
                        value={targetTime / second}
                        onChange={e => settargetTime(e.target.value * second)}
                    />
                )}
            </div>
            <div style={{ background: timerState === 'alarm' ? 'red' : 'inherit' }}>
                {(targetTime / second - elapsed / second).toFixed(1)}
            </div>
            <FillDiv
                elapsed={elapsed}
                targetTime={targetTime}
            />
        </>
    )
} 