import dynamic from 'next/dynamic'

import Header from '../../components/Header'
import withLayout from '../../components/Layout'
import Md from '../../components/Md'

const GeoLines = dynamic(() => import('../../components/code/geolines'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

const Page = () => (
  <>

    <Header />

    <main>


      <article>
        <Md source={`
# Animating d3-geo with d3-ease

Click the map to reset the animation. When clicking, a random point is chosen and a great circle line is animated as moving from the random point to Stockholm.
The projection is updated every frame to give the impression of a spinning 3D globe.

Code can be found [here](https://github.com/synvinkel/synvinkel-next/blob/master/components/code/geolines/index.js).
        
        `} />

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
        cursor: pointer;
      }

      pre.inline {
        display: inline;
      }
    `}</style>
  </>
)

export default withLayout(Page, 'The Page')
