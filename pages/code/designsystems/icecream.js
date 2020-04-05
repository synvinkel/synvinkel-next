import dynamic from 'next/dynamic'

import Header from '../../../components/Header'
import withLayout from '../../../components/Layout'

const IceCream = dynamic(import('../../../components/code/designsystems/icecream'), {
    ssr: false,
})

const Page = () => (
    <div>
        <Header />
        <main>
            <IceCream />
        </main>
    </div>
)

export default withLayout(Page)