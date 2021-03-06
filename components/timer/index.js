export * from './useInterval'
export * from './FillDiv'

// import { useState, useReducer, useEffect, useRef } from "react"
// import useInterval from './useInterval'

// const timerMachine = {
//     initial: 'idle',
//     states: {
//         idle: { on: { NEXT: 'running' } },
//         running: { on: { NEXT: 'paus', FINISH: 'alarm' } },
//         paus: { on: { NEXT: 'running',RESET: 'idle' } },
//         alarm: { on: { NEXT: 'idle' } }
//     }
// }


// const timerTransition = (state, event) => {
//     return timerMachine.states[state].on[event] || state;
// }

// export default function () {
//     const [timerState, timerSend] = useReducer(
//         timerTransition,
//         timerMachine.initial
//     )

//     const initialTime = 10
//     const scale = 1000
//     const fraction = 10

//     const [time, setTime] = useState(initialTime * scale)

//     useInterval(() => {
//         setTime(time - (scale / fraction))
//     }, timerState === 'running' ? (scale / fraction) : null)

//     useEffect(() => {
//         if (timerState === 'running' && time <= 0) {
//             setTime(0)
//             timerSend('FINISH')
//         }
//     }, [time])

//     useEffect(() => {
//         if (timerState === 'idle') {
//             setTime(initialTime * scale)
//         }
//     }, [timerState])


//     return (
//         <>
//             <div >
//                 The timer is <strong>{timerState}</strong>
//                 <button
//                     onClick={() => timerSend('NEXT')}
//                 >
//                     Change
//                 </button>
//                 {timerState === 'paus' && <button
//                     onClick={() => timerSend('RESET')}
//                 >
//                     reset
//                     </button>}
//             </div>
//             <div style={{ background: timerState === 'alarm' ? 'red' : 'inherit' }}>
//                 {(time / scale).toFixed(1)}
//             </div>
//         </>
//     )
// } 