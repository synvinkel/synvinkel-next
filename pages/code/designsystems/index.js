import dynamic from 'next/dynamic'

import withLayout from '../../../components/Layout'
import Header from '../../../components/Header'
import Link from 'next/link'

const Natural = dynamic(import('../../../components/code/designsystems/designaword/Natural'), {
    ssr: false
})


const Page = () => {

    const exercises = [
        { name: 'Design a word', url: '/code/designsystems/designaword' },
        { name: 'Icecream', url: '/code/designsystems/icecream' },
        { name: 'Procedural shapes', url: '/code/designsystems/proceduralshapes' },
    ]

    return (
        <div>

            <Header />

            <main>

                <article>

                    <h1>Programming Design Systems</h1>

                    <p>
                        Reading and working through the exercises of <a href="https://programmingdesignsystems.com/">Programming Design Systems</a>.
                </p>

                    <p>
                        For doing the exercises I wrote my first custom React hook: <a href="https://gist.github.com/johnniehard/088052713d73b6f319c43e6fa69259e1#file-usesketch-js">useSketch</a>. Useful when making a lot of different <a href="https://p5js.org/">p5js</a> sketches with minimal repetetive boilerplate.
                </p>

                    <h2>Exercises</h2>

                    <ul>
                        {exercises.map(e => (
                            <li>
                                <Link href={e.url}>
                                    <a>{e.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </article>
            </main>
        </div>

    )
}

export default withLayout(Page)
