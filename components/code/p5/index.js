import p5 from 'p5'
import { useEffect } from 'react'

/*

    This works really well and all, but the p5
    that gets bundled here is not minified in any way. Really bulky if I'm just gonna draw some boxes.

*/

export default function useP5(sketch, domRef){
    useEffect(() => {
        new p5(sketch, domRef.current)
    }, [])
}