import { useEffect, useRef } from 'react'
import Header from '../../components/Header'
import withLayout from '../../components/Layout'

import Spirals from '../../components/code/spirals'

const Page = () => {

    const ref = useRef(null)

    useEffect(() => {
        Spirals(ref.current)
    })

    return (

        <>
            <div id="graphic" ref={el => (ref.current = el)} >
                <canvas />
            </div>

            <style jsx>{`
        #graphic {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0;
            overflow: hidden;
            z-index: -10;
        }
    `}</style>
        </>
    )
}

export default withLayout(Page, 'The Page')
