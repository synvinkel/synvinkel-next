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

                <ul>
                    <li>
                        <Link href="./designaword">
                            <a>Design a word</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="./icecream">
                            <a>Icecream</a>
                        </Link>
                    </li>
                </ul>
            </main>
        </div>

    )
}

export default withLayout(Page)
