/*
    Back button for full screen pages like canvas sketches
*/

import Link from 'next/link'
import { useRouter } from 'next/router'

const BackButton = ({ color }) => {

    const router = useRouter()

    console.log(router)

    return (
        <div
            className="backbutton"
            onClick={() => router.back()}    
        >
                <h4>back</h4>
            <style jsx>{`
.backbutton {
    position: absolute;
    z-index: 1000;
    color: ${color};
    opacity: 0.4;
    padding: 10px;
    font-family: sans-serif;
    text-transform: uppercase;
    font-size: 15px;
}
            `}</style>
        </div>
    )
}

export default BackButton