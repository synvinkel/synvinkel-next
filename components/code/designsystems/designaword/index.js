
import Natural from './Natural'
import Observant from './Observant'
import Dangerous from './Dangerous'

const sketches = [Natural, Observant, Dangerous]

export default function DesignAWord() {

    return (
        <>
            {sketches.map((Sketch, i) => (
                <div key={i} className='sketch'>
                    <Sketch />
                </div>
            ))}
            <style jsx>{`
                    .sketch {
                        width: 400px;
                        max-width: 90%;
                        height: 400px;
                        margin: 0 auto;
                        margin-bottom: 40px;
                    }
            `}</style>
        </>
    )
}
