import dynamic from 'next/dynamic'

import Header from '../../components/Header'
import withLayout from '../../components/Layout'

const GeoLines = dynamic(() => import('../../components/code/geolines'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

const Page = () => (
  <>

    <Header />

    <main>


      <article>
        <h1>Animating d3-geo with d3-ease</h1>

        <p>Below is a world map drawn on an html <pre className="inline">{`<canvas>`}</pre> element</p>

        <div className="canvascontainer">
          <GeoLines />
        </div>
        <p>

        </p>
      </article>
    </main>

    <style jsx>{`
      .canvascontainer {
        display: flex;
        justify-content: center;
        width: 100%;
      }

      pre.inline {
        display: inline;
      }
    `}</style>
  </>
)

export default withLayout(Page, 'The Page')
