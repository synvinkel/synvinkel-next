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

            <Link href="./designsystems/designaword">
                <a>Design a word</a>
            </Link>
            </main>
        </div>

    )
}

export default withLayout(Page)
