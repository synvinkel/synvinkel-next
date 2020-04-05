import dynamic from 'next/dynamic'

import withLayout from '../../../components/Layout'
import Header from '../../../components/Header'
import Link from 'next/link'

const Natural = dynamic(import('../../../components/code/designsystems/designaword/Natural'), {
    ssr: false
})


const Page = () => {


    return (
        <div>

            <Header />

            <main>

                <h1>Programming Design Systems</h1>

                <p>
                    Reading and working through the exercises of <a href="https://programmingdesignsystems.com/">Programming Design Systems</a>.
                </p>

                <h2>Exercises</h2>

                <ul>
                    <li>
                        <Link href="/code/designsystems/designaword">
                            <a>Design a word</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/code/designsystems/icecream">
                            <a>Icecream</a>
                        </Link>
                    </li>
                </ul>
            </main>
        </div>

    )
}

export default withLayout(Page)
