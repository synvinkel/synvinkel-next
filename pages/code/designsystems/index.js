import dynamic from 'next/dynamic'

import withLayout from '../../../components/Layout'
import Header from '../../../components/Header'

const TestSketch = dynamic(import('../../../components/code/p5/TestSketch'), {
    ssr: false
})


const Page = () => {


    return (
        <div>

            <Header />

            <main>

                <TestSketch />

            </main>
        </div>

    )
}

export default withLayout(Page)
