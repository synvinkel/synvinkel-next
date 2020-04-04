import dynamic from 'next/dynamic'

import Header from '../../../components/Header'
import withLayout from '../../../components/Layout'

const DesignAWord = dynamic(import('../../../components/code/designsystems/designaword'), {
    ssr: false,
})

const Page = () => (
    <div>
        <Header />
        <main>
            <DesignAWord />
        </main>
    </div>
)

export default withLayout(Page)
